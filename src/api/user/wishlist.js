const router = require("express").Router();
const verifyToken = require("../../utils/verifyToken");

const decrypt = require("../../utils/crypto");
// var tokenConfig = require('../../configs/tokenConfigs');
const config = require("../../configs/appconfig");
//id	customerId	productId	variantId	quantity	updatedat
router.use(verifyToken);

let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});

router.get("/", (req, res, next) => {
  db.getConnection((err, connection) => {
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return res.send(data);
    }
    let query = `SELECT b.* FROM tbl_wishlist a left JOIN tbl_productslist b ON a.productId = b.productId where customerId=?`;
    connection.query(query, [req.userId], function (err, rows) {
      connection.release();
      if (err) {
        data = {
          status: -1,
          message: "Error Occurred",
          error: err,
        };
      } else if (rows.length > 0) {
        data = {
          status: 1,
          message: "Data fetch successful",
          data: rows,
        };
      } else {
        data = {
          status: 0,
          message: "No Data Found",
        };
      }
      next(data);
    });
  });
});

router.post("/transfer/:id", (req, res, next) => {
  // return console.log(req.params.id)
  let ID = req.params.id;
  db.getConnection((err, connection) => {
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }
    let query = `select productId from tbl_wishlist where id=? and customerId=?`;
    connection.query(query, [ID, req.userId], function (err, rows) {
      let data;
      if (err) {
        data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
        return;
      } else if (rows.length > 0) {
        let params = {
          customerId: req.userId,
          productId: rows[0].productId,
          quantity: 1,
        };
        query = `insert into tbl_cart set ?`;
        connection.query(query, [params], function (err, rows) {
          if (err) {
            data = {
              status: -1,
              message: "Server Error",
              error: err,
            };
            next(data);
            return;
          } else if (rows.affectedRows > 0) {
            query = `delete from tbl_wishlist where id=? and customerId=?`;
            connection.query(query, [ID, req.userId], function (err, rows) {

              if (err) {
                data = {
                  status: -1,
                  message: "Server Error",
                  error: err,
                };
              } else if (rows.affectedRows > 0) {
                data = {
                  status: 1,
                  message: "Data moved successful",
                };
              } else {
                data = {
                  status: 0,
                  message: "Wrong Id provided",
                };
              }
              //   console.log(data);
              connection.release();
              next(data);
            });
          } else {
            data = {
              status: 0,
              message: "Wrong Id provided",
            };
            return next(data);
          }
        });
      } else {
        data = {
          status: 0,
          message: "Wrong Id provided",
        };
        next(data);
      }
    });
  });
});

router.post("/", decrypt, (req, res, next) => {
  let data;
  db.getConnection((err, connection) => {
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }

    let query = `insert into tbl_wishlist set ?`;

    let params = {
      customerId: req.userId,
      productId: req.body.productId,
    };
    connection.query(query, params, function (err, rows) {
      connection.release();
      if (err) {
        data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
      } else if (rows.affectedRows > 0) {
        data = {
          status: 1,
          message: "Data inserted successful",
        };
      } else {
        data = {
          status: 0,
          message: "Failed To Insert",
        };
      }
      next(data);
    });
  });
});

router.delete("/:id", (req, res, next) => {
  db.getConnection((err, connection) => {
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }
    let query = `delete from tbl_wishlist where id=? and customerId=?`;
    connection.query(query, [req.params.id, req.userId], function (err, rows) {
      let data;
      connection.release();
      if (err) {
        data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
      } else if (rows.affectedRows > 0) {
        data = {
          status: 1,
          message: "Data removed successful",
        };
      } else {
        data = {
          status: 0,
          message: "Wrong Id provided",
        };
      }
      next(data);
    });
  });
});

router.all("/:id", (req, res, next) => {
  return next({ status: -1, message: "Forbidden" });
});
module.exports = router;
