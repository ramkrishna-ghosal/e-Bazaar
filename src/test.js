const router = require('express').Router(); //api/category/
// const db = require('../configs/mysql');
const crypto = require("crypto-js");
var verifyToken = require('./utils/verifyToken');
const env = require("./configs/appconfig");


router.get('/',(req,res)=>{
    // console.log('hi');
    
    const bcrypt = require('bcryptjs');
    bcrypt.hash('admin',10).then(hash=>res.send(hash));
})

router.get('/tokenresult',verifyToken,(req,res)=>{
    res.send(req.userId)
})

router.post('/encrypt',(req,res)=>{
    let data = crypto.AES.encrypt(JSON.stringify(req.body), env.encryptKey).toString();
    res.send(data);
})

module.exports = router;

//admin pwd -> admin