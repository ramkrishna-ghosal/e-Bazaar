//PATH: api/user/auth
const router = require("express").Router();
// const db = require('../../configs/mysql');
const bcrypt = require("bcryptjs");
const upload = require("../../utils/file-upload");

var jwt = require("jsonwebtoken");
const decrypt = require("../../utils/crypto");
// var tokenConfig = require('../../configs/tokenConfigs');
const config = require("../../configs/appconfig");
let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});
//firstName	lastName	picture	mobile	email	age	gender	password : DONE
router.post("/register", upload.single("photo"), decrypt, (req, res, next) => {
  let data = {};
  const params = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    email: req.body.email,
    createdat: new Date().toISOString().replace("T", " ").replace("Z", ""),
  };
  if (req.body.age && parseInt(req.body.age) > 18) {
    params.age = req.body.age;
  }
  if (req.body.gender) {
    params.gender = req.body.gender;
  }
  if (req.file) {
    // console.log('Hi')
    params.picture = req.file.path.split("src")[1];
  }
  let query = `insert into tbl_registration set ?`;
  db.getConnection((err, connection) => {
    if (err) return next(err.sqlMessage);
    connection.query(query, params, function (err, result) {
      if (err) {
        connection.release();
        data = {
          status: -1,
          message: err.sqlMessage,
        };
        next(data);
      } else if (result.affectedRows > 0) {
        addUserLogin(req, res, result.insertId, connection);
      } else {
        connection.release();
        data = {
          status: 0,
          message: "Unable to Insert",
        };
        next(data);
      }
    });
  });
});

// username(mob/email), password : DONE
router.post("/login", decrypt, (req, res, next) => {
  // console.log(req.body);

  let query = "";
  if (req.body.username.includes("@")) {
    query = `select userId,password from tbl_auth where email=?`;
  } else {
    query = `select userId,password from tbl_auth where mobile=?`;
  }
  db.getConnection((err, connection) => {
    if (err) return next(err.sqlMessage);
    connection.query(query, req.body.username, function (err, result) {
      connection.release();
      if (err) return next(err.sqlMessage);
      else if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, status) => {
          if (err)
            res.status(200).json({ status: -1, message: "Server Error" });
          if (status) {
            let token = jwt.sign(
              { userId: result[0].userId },
              config.tokenConfig.secret
            );
            let data = {
              status: 1,
              token: token,
              message: "Login Successful",
            };
            res.setHeader("Authorization", "Bearer " + token);
            res.status(200).json(data);
          } else {
            let data = {
              status: 0,
              message: "Authentication Error!!",
            };
            next(data);
          }
        });
      } else {
        let data = {
          status: 0,
          message: "Username Invalid",
        };
        next(data);
      }
    });
  });
});

// email : DONE
router.post("/forgotpassword", decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select userId from tbl_auth where email=?`;
    if (err) return next(err.sqlMessage);
    connection.query(query, [req.body.email], function (err, rows) {
      if (err) {
        connection.release();
        return next({ status: -1, message: err.sqlMessage });
      } else if (rows) {
        let userId = rows[0].userId;
        let secretCode = randomString();
        let query = `update tbl_auth set secretCode=? where userId=?`;
        connection.query(query, [secretCode, userId], function (err, rows) {
          connection.release();
          if (err) return next({ status: -1, message: err.sqlMessage });
          else if (rows) {
            let params = {
              to: req.body.email,
              subject: "Forgot Password for e-Bazaar",
              message: `Hi,\n\n Just wanted to inform someone wished to reset password for your account with us. Please use the code to verify your authenticity.\n\n\n ${secretCode} \n\n\n Regards,\n Team eCom`,
            };
            sendUserMail(params);
            let data = {
              status: 1,
              message: "Email Sent",
            };
            next(data);
          } else {
            next({ status: 0, message: "Password Reset Error" });
          }
        });
      } else {
        let data = {
          status: 0,
          message: "Wrong email",
        };
        next(data);
      }
    });
  });
});

// email, secretCode, newPassword : DONE
router.post("/verifysecretcode", decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select secretCode from tbl_auth where email=?`;
    if (err) return next(err.sqlMessage);
    connection.query(query, [req.body.email], function (err, rows) {
      if (err) {
        connection.release();
        return next({ status: -1, message: err.sqlMessage });
      } else if (rows[0]) {
        if (req.body.secretCode === rows[0].secretCode) {
            bcrypt.hash(req.body.newPassword, config.tokenConfig.saltRounds, function (err, hashedPassword) {
                let params = {
                    password: hashedPassword,
                    secretCode: null
                }
                let query = `update tbl_auth set ? where email=?`;
                connection.query(query, [params, req.body.email], function (err, rows) {
                  connection.release();
                  if (err) return next({ status: -1, message: err.sqlMessage });
                  else if (rows.affectedRows > 0) {
                    let data = {
                      status: 1,
                      message: "Password Change Success",
                    };
                    next(data);
                  }
                });
            });
         
        } else {
          let data = {
            status: 0,
            message: "Validation Code mismatch",
          };
          next(data);
        }
      } else {
        connection.release();
        let data = {
          status: -1,
          message: "Wrong email entered",
        };
        next(data);
      }
    });
  });
});
//test
// if(env.env === 'dev')
//     router.post('/authtest', (req, res, next) => {
//         let data = req.headers['authorization'].split(' ')[1];
//         console.log(data);
//         res.end();
//     });

module.exports = router;

addUserLogin = (req, res, id, connection) => {
  bcrypt.hash(req.body.password, config.tokenConfig.saltRounds, (err, hash) => {
    if (err) return next({ message: "Encryption Error" });
    else {
      let hashedPassword = hash;
      sql = `select userId from tbl_registration where id=?`;
      connection.query(sql, id, (err, result) => {
        if (err) {
          connection.release();
          next({ status: -1, message: "Server Error", error: err });
        } else {
          params = {
            userId: result[0].userId,
            mobile: req.body.mobile,
            email: req.body.email,
            password: hashedPassword,
            createdat: new Date()
              .toISOString()
              .replace("T", " ")
              .replace("Z", ""),
          };
          sql = `insert into tbl_auth set ?`;
          connection.query(sql, [params], (err, result) => {
            connection.release();
            if (err)
              next({ status: -1, message: "Server Error", error: err });
            else {
              data = {
                status: 1,
                message: "Data inserted successful",
              };
              next(data);
            }
          });
        }
      });
    }
  });
};
//to,subject,message
sendUserMail = (data) => {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ramkrishna.testing1@gmail.com',
        pass: 'Badimasa001$'
    }
  });

  var mailOptions = {
    from: "ramkrishna.testing1@gmail.com",
    to: data.to,
    subject: data.subject,
    text: data.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error,info);
  });
};

randomString = () => {
  var chars = "0123456789";
  var string_length = 6;
  var randomstring = "";
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
};
