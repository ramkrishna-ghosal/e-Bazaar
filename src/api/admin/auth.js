//PATH: api/user/auth
const router = require('express').Router();
// const db = require('../../configs/mysql');
const bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
const decrypt = require('../../utils/crypto');
// var tokenConfig = require('../../configs/tokenConfigs');
const config = require('../../configs/appconfig');
let db;
router.use((req,res,next)=>{
    db = config.mysql;
    next();
})

// username(mob/email), password : DONE
router.post('/login', decrypt, (req, res, next) => {
    // console.log(req.body);
    let query = '';
    if (req.body.username.includes('@')) {
        query = `select userId,password from tbl_auth where email=?`;
    }
    else {
        query = `select userId,password from tbl_auth where mobile=?`
    }
    db.getConnection((err, connection) => {
        if (err) return next(err);
        connection.query(query, req.body.username, function (err, result) {
            connection.release();
            if (err) return next(err.sqlMessage);
            else if (result.length > 0) {
                // console.log(result);
                bcrypt.compare(req.body.password, result[0].password, (err, status) => {
                    if (err) next({ status: -1, message: "Server Error" });
                    if (status) {
                        let token = jwt.sign({ userId: result[0].userId }, config.tokenConfig.secret);
                        let data = {
                            status: 1,
                            token: token,
                            message: "Login Successful"
                        }
                        next(data)
                    }
                    else {
                        let data = {
                            status: 0,
                            message: "Authentication Error!!"
                        }
                        next(data)
                    }
                });
            }
            else {
                let data = {
                    status: 0,
                    message: "Username Invalid"
                }
                next(data);
            }
        });
    })
});

//  email : DONE
router.post('/forgotpassword', decrypt, (req, res, next) => {
    db.getConnection((err, connection) => {
        let query = `select userId from tbl_auth where email=?`;
        if (err) return next(err.sqlMessage);
        connection.query(query, [req.body.email], function (err, rows) {
            if (err) {
                connection.release();
                return next({ status: -1, message: err.sqlMessage });
            }
            else if (rows) {
                let userId = rows[0].userId;
                let secretCode = randomString();
                let query = `update tbl_auth set secretCode=? where userId=?`;
                connection.query(query, [secretCode, userId], function (err, rows) {
                    connection.release();
                    if (err) return next({ status: -1, message: err.sqlMessage });
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
                        next(data);
                    }
                    else {
                        next({ status: 0, message: "Password Reset Error" })
                    }
                });


            }
            else {
                let data = {
                    status: 0,
                    message: "Wrong email"
                }
                next(data);
            }

        });
    })
});

//email,secretCode : DONE
router.post('/verifysecretcode', decrypt, (req, res, next) => {
    db.getConnection((err, connection) => {
        let query = `select secretCode from tbl_auth where email=?`;
        if (err) return next(err.sqlMessage);
        connection.query(query, [req.body.email], function (err, rows) {
            if (err) {
                connection.release();
                return next({ status: -1, message: err.sqlMessage });
            }
            else if (rows[0]) {
                if (req.body.secretCode === rows[0].secretCode) {
                    let query = `update tbl_auth set secretCode=NULL where email=?`;
                    connection.query(query, [req.body.email], function (err, rows) {
                        connection.release();
                        if (err) return next({ status: -1, message: err.sqlMessage });
                        else if (rows.affectedRows > 0) {

                            let data = {
                                status: 1,
                                message: "Validation Success"
                            }
                            next(data)
                        }
                    });

                }
                else {
                    let data = {
                        status: 0,
                        message: "Validation Code mismatch"
                    }
                    next(data)
                }
            }
            else {
                connection.release();
                let data = {
                    status: -1,
                    message: "Wrong email entered"
                }
                next(data)
            }

        });
    })
});

// email,newPassword : DONE
router.post('/changepassword', decrypt, (req, res, next) => {
    let data;
    db.getConnection((err, connection) => {
        let query = `select userId from tbl_auth where email=?`;
        if (err) return next(err.sqlMessage);
        connection.query(query, [req.body.email], function (err, rows) {
            if (err) {
                connection.release();
                return next({ status: -1, message: err.sqlMessage });
            }
            else if (rows) {
                let userId = rows[0].userId;
                bcrypt.hash(req.body.newPassword, config.tokenConfig.saltRounds, function (err, hashedPassword) {
                    params = {
                        password: hashedPassword,
                        createdat: new Date()
                    }
                    sql = `update tbl_auth set ? where userId=?`
                    connection.query(sql, [params,userId], (err, result) => {
                        connection.release();
                        if (err) next({ status: -1, message: "Server Error", error: err })
                        else if(result.affectedRows>0){
                            data = {
                                status: 1,
                                message: "Password updated successful"
                            }
                            next(data);
                        }
                        else{
                            data = {
                                status: 0,
                                message: "Update Failed"
                            };
                            next(data);   
                        }
                    });
                })
                

            }
            else {
                let data = {
                    status: 0,
                    message: "Wrong email"
                }
                next(data);
            }

        });
    })
});


module.exports = router;

addLogin = (req, res, id, connection) => {
    bcrypt.hash(req.body.password, tokenConfig.saltRounds, function (err, hash) {
        if (err) return next({ message: "Encryption Error" });
        else {
            let hashedPassword = hash;
            sql = `select userId from tbl_registration where id=?`
            connection.query(sql, id, (err, result) => {
                if (err) {
                    connection.release();
                    next({ status: -1, message: "Server Error", error: err })
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
                        if (err) next({ status: -1, message: "Server Error", error: err })
                        else {
                            data = {
                                status: 1,
                                message: "Data inserted successful"
                            }
                            next(data);
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
            pass: 'Badimasa001$'
        }
    });

    var mailOptions = {
        from: 'ramkrishna.testing1@gmail.com',
        to: data.to,
        subject: data.subject,
        text: data.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        // console.log(error,info);
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