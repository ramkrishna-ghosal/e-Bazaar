//PATH : api/subcategories

const router = require("express").Router();
const config = require("../../configs/appconfig");
const decrypt = require("../../utils/crypto");
let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});

router.get("/cat/:catid", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select * from tbl_subcategory where categoryId=?`;
    if (err) return next(err.sqlMessage);
    connection.query(query, [req.params.catid], function (err, rows) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (rows.length > 0) {
        let data = {
          status: 1,
          message: "Data updated successful",
          data: rows,
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Wrong Id provided.",
        };
        next(data);
      }
    });
  });
});

router.get("/:id", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select * from tbl_subcategory where id=?`;
    if (err) return next(err.sqlMessage);
    connection.query(query, req.params.id, function (err, rows) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (rows.length > 0) {
        let data = {
          status: 1,
          message: "Data fetched successful",
          data: rows,
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Wrong Id provided.",
        };
        next(data);
      }
    });
  });
});

router.get("/categoryid/:id", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select a.categoryId,a.name as categoryName,b.subCategoryId,b.name as subCategoryName from tbl_category as a, tbl_subcategory as b where 
        b.subCategoryId=? and a.categoryId=b.categoryId`;
    if (err) return next(err.sqlMessage);
    connection.query(query, req.params.id, function (err, rows) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (rows.length > 0) {
        let data = {
          status: 1,
          message: "Data updated successful",
          data: rows[0],
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Wrong Id provided.",
        };
        next(data);
      }
    });
  });
});
// categoryId,name : DONE
router.post("/", decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `insert into tbl_subcategory set ?`;
    let params = {
      categoryId: req.body.categoryId,
      name: req.body.name,
      isActive: 1,
    };
    if (err) return next(err.sqlMessage);
    connection.query(query, params, function (err, rows) {
      connection.release();
      if (err) return next(err);
      if (rows.affectedRows > 0) {
        let data = {
          status: 1,
          message: "Data inserted successful",
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Unable to Insert records",
        };
        next(data);
      }
    });
  });
});

// categoryId,name : DONE
router.put("/:id", decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `update tbl_subcategory set ? where id=?`;
    let params = {
      categoryId: req.body.categoryId,
      name: req.body.name,
    };
    if (err) return next(err.sqlMessage);
    connection.query(query, [params, req.params.id], function (err, results) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (results.affectedRows > 0) {
        let data = {
          status: 1,
          message: "Data updated successful",
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Wrong Id provided.",
        };
        next(data);
      }
    });
  });
});

// isActive : DONE
router.delete("/:id", decrypt, (req, res, next) => {
  // console.log(req.body);
  
  db.getConnection((conerr, connection) => {
    let query = `update tbl_subcategory set isActive=? where id=?`;
    if (conerr) return next(conerr.sqlMessage);
    connection.query(query, [req.body.isActive, req.params.id], function (
      err,
      results
    ) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (results.affectedRows > 0) {
        let data = {
          status: 1,
          message: "Data removed successful",
        };
        // console.log(data, "lklkk");

        next(data);
      } else {
        let data = {
          status: 0,
          message: "Data not Found",
        };
        next(data);
      }
    });
  });
});

module.exports = router;
