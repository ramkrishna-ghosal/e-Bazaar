const router = require('express').Router(); //api/category/
// const db = require('../configs/mysql');
var verifyToken = require('./utils/verifyToken');


router.get('/',(req,res)=>{
    const bcrypt = require('bcryptjs');
    bcrypt.hash('test123',10).then(hash=>res.send(hash));
})

router.get('/tokenresult',verifyToken,(req,res)=>{
    res.send(req.userId)
})

module.exports = router;