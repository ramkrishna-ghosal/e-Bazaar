//PATH: api/user/auth
const router = require('express').Router();
const db = require('../../configs/mysql');
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
var tokenConfig = require('../../configs/tokenConfigs');
const env = require('../../configs/appconfig');
//firstName	lastName	picture	mobile	email	age	gender	password
router.post('/register', (req, res) => {
    let data = {};
    //check
    let valid = true;
    let params = ["firstName", "lastName", "mobile", "email"];
    params.forEach(val => {
        if (req.body[val] === undefined || req.body[val] == null || req.body[val].length == 0) {
            // console.log('hi');
            valid = false;
        }
    })
    if (!valid)
        return res.json({ status: -1, message: "Validation Failure" });
    // return;
    //check ends
    params = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        picture: req.body.picture,
        mobile: req.body.mobile,
        email: req.body.email,
        createdat: new Date()
    }
    if (req.body.age && parseInt(req.body.age) > 18) {
        params.age = req.body.age;
    }
    if (req.body.gender) {
        params.gender = req.body.gender;
    }
    let query = `insert into tbl_registration set ?`
    db.getConnection((err, connection) => {
        if (err) return res.send(err.sqlMessage);
        connection.query(query, params, function (err, result) {

            if (err) {
                connection.release();
                data = {
                    status: -1,
                    message: err.sqlMessage
                }
                res.json(data);
            }
            else if (result.affectedRows > 0) {
                addLogin(req, res, result.insertId, connection);
            }
            else {
                connection.release();
                data = {
                    status: 0,
                    message: "Unable to Insert"
                }
                res.json(data);
            }
        });
    })
});

// username(mob/email), password
router.post('/login', (req, res) => {
    let query = '';
    if (req.body.username.includes('@')) {
        query = `select userId,password from tbl_auth where email=?`;
    }
    else {
        query = `select userId,password from tbl_auth where mobile=?`
    }
    db.getConnection((err, connection) => {
        if (err) return res.send(err.sqlMessage);
        connection.query(query, req.body.username, function (err, result) {
            connection.release();
            if (err) return res.send(err.sqlMessage);
            else if (result.length > 0) {
                bcrypt.compare(req.body.password, result[0].password, (err, status) => {
                    if (err) res.status(200).json({ status: -1, message: "Server Error" });
                    if (status) {
                        let token = jwt.sign({ userId: result[0].userId }, tokenConfig.secret);
                        let data = {
                            status: 1,
                            token: token,
                            message: "Login Successful"
                        }
                        res.setHeader('Authorization','Bearer '+ token);
                        res.status(200).json(data)
                    }
                    else {
                        let data = {
                            status: 0,
                            message: "Authentication Error!!"
                        }
                        res.json(data)
                    }
                });
            }
            else {
                let data = {
                    status: 0,
                    message: "Username Invalid"
                }
                res.json(data);
            }
        });
    })
});

router.post('/forgotpassword', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select userId from tbl_auth where email=?`;
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [req.body.email], function (err, rows) {
            if (err) {
                connection.release();
                return res.json({ status: -1, message: err.sqlMessage });
            }
            else if (rows) {
                let userId = rows[0].userId;
                let secretCode = randomString();
                let query = `update tbl_auth set secretCode=? where userId=?`;
                connection.query(query, [secretCode, userId], function (err, rows) {
                    connection.release();
                    if (err) return res.json({ status: -1, message: err.sqlMessage });
                    else if (rows) {
                        let params = {
                            to: req.body.email,
                            subject: 'Forgot Password for eCom Site',
                            message: `Hi,\n\n Just wanted to inform someone wished to reset password for your account with us. Please use the code to verify your authenticity.\n\n\n ${secretCode} \n\n\n Regards,\n Team eCom`
                        }
                        sendMail(params);
                        let data = {
                            status: 1,
                            message: "Email Sent"
                        }
                        res.json(data);
                    }
                    else {
                        res.json({ status: 0, message: "Password Reset Error" })
                    }
                });


            }
            else {
                let data = {
                    status: 0,
                    message: "Wrong email"
                }
                res.json(data);
            }

        });
    })
});

router.post('/verifysecretcode', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select secretCode from tbl_auth where email=?`;
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [req.body.email], function (err, rows) {
            if (err) {
                connection.release();
                return res.json({ status: -1, message: err.sqlMessage });
            }
            else if (rows[0]) {
                if (req.body.secretCode === rows[0].secretCode) {
                    let query = `update tbl_auth set secretCode=NULL where email=?`;
                    connection.query(query, [req.body.email], function (err, rows) {
                        connection.release();
                        if (err) return res.json({ status: -1, message: err.sqlMessage });
                        else if (rows.affectedRows > 0) {

                            let data = {
                                status: 1,
                                message: "Validation Success"
                            }
                            res.json(data)
                        }
                    });

                }
                else {
                    let data = {
                        status: 0,
                        message: "Validation Code mismatch"
                    }
                    res.json(data)
                }
            }
            else {
                connection.release();
                let data = {
                    status: -1,
                    message: "Wrong email entered"
                }
                res.json(data)
            }

        });
    })
});
//test
if(env.env === 'dev')
    router.post('/authtest', (req, res) => {
        let data = req.headers['authorization'].split(' ')[1];
        console.log(data);
        res.end();
    });


module.exports = router;

addLogin = (req, res, id, connection) => {
    bcrypt.hash(req.body.password, tokenConfig.saltRounds, function (err, hash) {
        if (err) return res.json({ message: "Encryption Error" });
        else {
            let hashedPassword = hash;
            sql = `select userId from tbl_registration where id=?`
            connection.query(sql, id, (err, result) => {
                if (err) {
                    connection.release();
                    res.json({ status: -1, message: "Server Error", error: err })
                }
                else {
                    params = {
                        userId: result[0].userId,
                        mobile: req.body.mobile,
                        email: req.body.email,
                        password: hashedPassword,
                        createdat: new Date()
                    }
                    sql = `insert into tbl_auth set ?`
                    connection.query(sql, [params], (err, result) => {
                        connection.release();
                        if (err) res.json({ status: -1, message: "Server Error", error: err })
                        else {
                            data = {
                                status: 1,
                                message: "Data inserted successful"
                            }
                            res.json(data);
                        }
                    });
                }
            });
        }
    });



}
//to,subject,message
sendMail = (data) => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ramkrishna.testing1@gmail.com',
            pass: 'Badimasa#123'
        }
    });

    var mailOptions = {
        from: 'ramkrishna.testing1@gmail.com',
        to: data.to,
        subject: data.subject,
        text: data.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        //console.log(error,info);
    });
}

randomString = () => {
    var chars = "0123456789";
    var string_length = 6;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
}