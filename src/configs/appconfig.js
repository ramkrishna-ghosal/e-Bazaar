const mysql = require("mysql");

///prod
// module.exports = {
//     env:'dev',
//     tokenConfig: {
//         secret: 'ecom-web',
//         saltRounds: 10
//     },
//   mysql: mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'ebazaar',
//     password: 'D1f68?xy',
//     database: 'a1869d62c_ecomtest',
//     debug: false
// }),
//     encryptKey: 'e-B@zAAr'
// };

//dev
module.exports = {
  env: "dev",
  tokenConfig: {
    secret: 'ecom-web',
    saltRounds: 10,
  },
  mysql: mysql.createPool({
    connectionLimit: 10,
    host: "rkghosal.co.in",
    user: "ebazaar",
    password: "D1f68?xy",
    database: "a1869d62c_ecomtest",
    debug: false,
  }),
  encryptKey: "e-B@zAAr",
  cipherKey: "e-R@@Zab"
};
