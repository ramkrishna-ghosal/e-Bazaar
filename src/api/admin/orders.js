const router = require("express").Router();
// const db = require('../../configs/mysql');

const config = require("../../configs/appconfig");
const decrypt = require("../../utils/crypto");

let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});
router.get("/", (req, res, next) => {
  db.getConnection((err, connection) => {
    let data;
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }
    let query = `select * from tbl_orders order by id desc`;
    connection.query(query, function (err, rows) {
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

router.get("/:id", (req, res, next) => {
  db.getConnection((err, connection) => {
    let data;
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }
    let query = `select * from tbl_orders where id=${req.params.id}`;
    connection.query(query, function (err, rows) {
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

/* customerId	deliveryAddress	billingAddress	orderDetails	amount	payment
orderDetails=> variantId	quantity	amount
*/
router.post("/", decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `insert into tbl_orders set ?`;
    let params = {
      customerId: req.userId,
      deliveryAddress: req.body.deliveryAddress,
      billingAddress: req.body.billingAddress,
      orderDetails: req.body.orderDetails,
      amount: req.body.amount,
      payment: req.body.payment,
      orderStatus: "Placed",
      trackingNo: "",
      createdat: new Date().toISOString(),
    };
    if (err) {
      data = {
        status: -1,
        message: "Error Occurred",
        error: err,
      };
      return next(data);
    }
    connection.query(query, params, function (err, rows) {
      connection.release();
      if (err) {
        data = {
          status: -1,
          message: "Error Occurred",
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
          message: "Unable to Insert",
        };
      }
      next(data);
    });
  });
});

// trackingNo : DONE
router.put("/:id", decrypt, (req, res, next) => {
  // return console.log(req.body);  
  db.getConnection((err, connection) => {
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }
    let data = {
      orderStatus: "Shipped",
      trackingNo: req.body.trackingNo,
      updatedat: new Date().toISOString().replace('T', ' ').replace('Z', '')
    };
    let query = `update tbl_orders set ? where id=?`;
    connection.query(query, [data, req.params.id], function (err, rows) {
      connection.release();
      if (err) {
        data = {
          status: -1,
          message: "Error Occurred",
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

// status : DONE
router.delete("/:id", decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    if (err) {
      data = {
        status: -1,
        message: "Server Error",
        error: err,
      };
      return next(data);
    }
    let data = {
      orderStatus: req.body.status,
      updatedat: new Date().toISOString().replace('T', ' ').replace('Z', '')
    };
    let query = `update tbl_orders set ? where id=?`;
    connection.query(query, [data, req.params.id], function (err, rows) {
      connection.release();
      if (err) {
        data = {
          status: -1,
          message: "Error Occurred",
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
          message: "Unable to Delete",
        };
      }
      next(data);
    });
  });
});

module.exports = router;
