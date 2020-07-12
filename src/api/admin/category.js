//PATH : api/admin/categories

const router = require("express").Router();
const config = require("../../configs/appconfig");
const decrypt = require("../../utils/crypto");

const upload = require("../../utils/file-upload");
let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});
router.get("/", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select * from tbl_category`;
    if (err) return next(err.sqlMessage);
    connection.query(query, function (err, rows) {
      connection.release();
      let data = {
        status: 1,
        message: "Data fetch successful",
        data: rows,
      };
      next(data);
    });
  });
});
//to-do
router.get("/list/all", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select id,categoryId,name,image from tbl_category where isActive=1`;
    if (err) return next(err.sqlMessage);
    connection.query(query, function (err, rows) {
      if (err) return next(err.sqlMessage);
      let categories = rows;
      query = `select id,subCategoryId,name,categoryId from tbl_subcategory where isActive=1`;
      connection.query(query, function (err, rows) {
        connection.release();
        if (err) return next(err.sqlMessage);
        let subcategories = rows;
        for (let cat of categories) {
          let list = [];
          for (let temp of subcategories) {
            if (temp.categoryId === cat.categoryId) {
              list.push(temp);
            }
          }
          if(list.length>0){
              cat.subcategories = list;
          }
        }
        let data = {
          status: 1,
          message: "Data fetch successful",
          data:  categories.filter(x=>x.subcategories),
        };
        next(data);
      });
    });
  });
});

router.get("/:id", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select * from tbl_category where id=${req.params.id}`;
    if (err) return next(err.sqlMessage);
    connection.query(query, function (err, rows) {
      connection.release();
      let data = {
        status: 1,
        message: "Data fetch successful",
        data: rows[0],
      };
      next(data);
    });
  });
});
// name,description : DONE
router.post("/", upload.single("photo"), decrypt, (req, res, next) => {
  let params = {
    name: req.body.name,
    description: req.body.description,
    isActive: 1,
  };
  // console.log(req.file);
  if (req.file) {
    // console.log('Hi')
    params.image = req.file.path.split("src")[1];
  }
  // console.log(params.image);
  // return next(params);
  db.getConnection((err, connection) => {
    let query = `insert into tbl_category set ?`;
    if (err) return next(err.sqlMessage);
    connection.query(query, params, function (err, rows) {
      connection.release();
      if (err) return next(err);
      let data = {
        status: 1,
        message: "Data Insertion successful",
      };
      next(data);
    });
  });
});
// name,description : DONE
router.put("/:id", upload.single("photo"), decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `update tbl_category set ? where id=?`;
    let params = {
      name: req.body.name,
      description: req.body.description,
    };
    if (req.file) {
      // console.log('Hi')
      params.image = req.file.path.split("src")[1];
    }
    if (err) return next(err.sqlMessage);
    connection.query(query, [params, req.params.id], function (err, rows) {
      connection.release();
      if (err) return next(err);
      let data = {
        status: 1,
        message: "Data updated successful",
      };
      next(data);
    });
  });
});
// isActive : DONE
router.delete("/:id", decrypt, (req, res, next) => {
  // console.log(req.body);

  db.getConnection((conerr, connection) => {
    let query = `update tbl_category set isActive=? where id=?`;
    if (conerr) return next(conerr.sqlMessage);
    connection.query(query, [req.body.isActive, req.params.id], function (
      err,
      result
    ) {
      connection.release();
      if (err) return next(err);
      if (result.affectedRows > 0) {
        let data = {
          status: 1,
          message: "Data updated successful",
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Category Id not found",
        };
        next(data);
      }
    });
  });
});

module.exports = router;
