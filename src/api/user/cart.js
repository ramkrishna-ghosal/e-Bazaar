const router = require("express").Router();
const verifyToken = require("../../utils/verifyToken");

const decrypt = require("../../utils/crypto");
// var tokenConfig = require('../../configs/tokenConfigs');
const config = require("../../configs/appconfig");

let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});

router.use(verifyToken);
// DONE
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
    let query = `SELECT a.id, a.productId, name, description, image, quantity FROM tbl_cart a LEFT JOIN tbl_products b ON a.productId = b.productId WHERE a.customerId = ?`;
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
    let query = `select productId from tbl_cart where id=? and customerId=?`;
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
          productId: rows[0].productId
        };
        query = `insert into tbl_wishlist set ?`;
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
            query = `delete from tbl_cart where id=? and customerId=?`;
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

//productId, quantity : DONE
router.post("/", decrypt, (req, res, next) => {
  // console.log(req.body);
  db.getConnection((err, connection) => {
    //   console.log(err, connection);
    let data;

    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }

    let query = `insert into tbl_cart set ?`;

    let params = {
      customerId: req.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
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

// quantity :DONE
router.put("/:id", decrypt, (req, res, next) => {
    // console.log(req.body);
  db.getConnection((err, connection) => {
    let query = `update tbl_cart set ? where id=? and customerId=?`;
    let params = {
      quantity: req.body.quantity
    };
    let data;
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }
    connection.query(query, [params, req.params.id, req.userId], function (
      err,
      rows
    ) {
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
          message: "Data updated successful",
        };
      } else {
        data = {
          status: 0,
          message: "Unable to Update",
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
    let query = `delete from tbl_cart where id=? and customerId=?`;
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

module.exports = router;
