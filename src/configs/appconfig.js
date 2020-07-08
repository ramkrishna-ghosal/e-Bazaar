const mysql = require('mysql');

module.exports.prod = {
    env:'prod',
    tokenConfig: {
        secret: 'ecom-web',
        saltRounds: 10
    },
    mysql: mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'logistic_user',
        password: 'Password@123',
        database: 'a1869d62c_ecomsite',
        debug: false
    }),
};

module.exports.dev = {
    env:'dev',
    tokenConfig: {
        secret: 'ecom-web',
        saltRounds: 10
    },
    mysql: mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'logistic_user',
        password: 'Password@123',
        database: 'ecomsite',
        debug: false
    }),
};