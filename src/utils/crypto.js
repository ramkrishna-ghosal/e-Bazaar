// crypto starts
const crypto = require("crypto-js");
const env = require("../configs/appconfig");

module.exports = (req, res, next) => {
  // console.log(req.method);
  if (req.method === "OPTIONS" || req.method === "GET") {
    next();
  } else {
    // console.log('crypto.js 12' , req.body, env.encryptKey);
    // data = crypto.AES.encrypt(JSON.stringify(params), env.encryptKey).toString();
    let data1 = crypto.AES.decrypt(req.body.data, env.encryptKey).toString(
      crypto.enc.Utf8
    );
    // console.log('crypto.js 12' , data1);
    req.body = JSON.parse(data1);
    next();
  }
};

// crypto ends
