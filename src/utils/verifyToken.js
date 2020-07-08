var jwt = require('jsonwebtoken');
var tokenConfig = require('../configs/tokenConfigs');
verifyToken = (req, res, next) => {
    let token_header = req.headers['authorization'];
    let token='';
    if(token_header){
        token = token_header.split(' ')[1];
    }
    else{
        return res.status(403).send({ auth: false, message: 'Forbidden!!' });
    }
    jwt.verify(token, tokenConfig.secret, function (err, decoded) {
        if (err)
            return res.send({ auth: false, message: 'Invalid Signature!' });
        // if everything good, save to request for use in other routes
        req.userId = decoded.userId;
        // req.userType = decoded.type;
        // console.log(JSON.stringify(decoded));
        // decodeTokken = decoded;
        next();
    });
}
 
module.exports = verifyToken;