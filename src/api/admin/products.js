const router = require("express").Router();
const config = require("../../configs/appconfig");
const decrypt = require("../../utils/crypto");
const upload = require("../../utils/file-upload");

let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});
// router.use("/variants/", require("./productVariant"));

router.get("/", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select * from tbl_productslist`;
    if (err) return next(err.sqlMessage);
    connection.query(query, function (err, rows) {
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
          message: "Data fetch successful",
          data: rows,
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "No data Found",
        };
        next(data);
      }
    });
  });
});

router.get("/category/:catid", (req, res, next) => {
  // console.log('ok');
  db.getConnection((err, connection) => {
    // let query = `select * from tbl_products where categoryId=?`
    query = `select * from tbl_productslist where categoryId=?`;
    if (err) return next(err.sqlMessage);
    connection.query(query, [req.params.catid], function (err, rows) {
      let products = [];
      if (err) {
        connection.release();
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (rows.length > 0) {
        products = rows;
        let data = {
          status: 0,
          message: "Data fetched successful",
          data: products,
        };
        return next(data);
        products.map((product, index) => {
          // console.log(product);

          sql = `select * from tbl_productvariants where productId=?`;
          connection.query(sql, [product.productId], function (err, results) {
            // console.log(index, results, product.productId);
            if (err) {
              connection.release();
              let data = {
                status: -1,
                message: "Server Error",
                error: err,
              };
              return next(data);
            } else if (results.length > 0) {
              product["variants"] = results;
            }
            // console.log(index,products.length - 1);

            if (index === products.length - 1) {
              return next(products);
            }
          });
        });

        // let data = {
        //     status: 1,
        //     message: "Data fetch successful",
        //     data: rows
        // }
        // next(data);
      } else {
        let data = {
          status: 0,
          message: "No data Found",
        };
        next(data);
      }
    });
  });
});

router.get("/subcategory/:subcatid", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select * from tbl_productslist where subCategoryId=?`;
    if (err) return next(err.sqlMessage);
    connection.query(query, [req.params.subcatid], function (err, rows) {
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
          message: "Data fetch successful",
          data: rows,
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "No data Found",
        };
        next(data);
      }
    });
  });
});

router.get("/:id", (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `select * from tbl_productslist where id=${req.params.id}`;
    if (err) return next(err.sqlMessage);
    connection.query(query, function (err, rows) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (rows.length) {
        let data = {
          status: 1,
          message: "Data fetch successful",
          data: rows[0],
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "No data Found",
        };
        next(data);
      }
    });
  });
});

// name	description	photo	tags	categoryId	subCategoryId	price	discountedPrice	stock : DONE
router.post("/", upload.single("photo"), decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    let query = `insert into tbl_productslist set ?`;

    let params = {
      name: req.body.name,
      description: req.body.description,
      image: "",
      tags: req.body.tags,
      categoryId: req.body.categoryId,
      subCategoryId: req.body.subCategoryId,
      price: req.body.price,
      offerPrice: req.body.offerPrice,
      stock: req.body.stock,
      isActive: 1,
      createdat: new Date().toISOString().replace("T", " ").replace("Z", ""),
    };

    if (req.file) {
      // console.log('Hi')
      params.image = req.file.path.split("src")[1];
    }
    // return;
    if (err) return next(err.sqlMessage);
    connection.query(query, params, function (err, result) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (result.affectedRows > 0) {
        let data = {
          status: 1,
          message: "Data Inserted successful",
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Error in Inserting Data",
        };
        next(data);
      }
    });
  });
});

//   name	description	tags	price	discountedPrice	stock : DONE
router.put("/:id", decrypt, (req, res, next) => {
  db.getConnection((err, connection) => {
    // console.log(req.body);
    let query = `update tbl_productslist set ? where id=?`;
    let params = {
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags, 
      price: req.body.price,
      offerPrice: req.body.offerPrice,
      stock: req.body.stock
    };
    if (err) return next(err.sqlMessage);
    connection.query(query, [params, req.params.id], function (err, result) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (result.affectedRows > 0) {
        let data = {
          status: 1,
          message: "Data Updated successful",
        };
        next(data);
      } else {
        let data = {
          status: 0,
          message: "Error in Updating Data",
        };
        next(data);
      }
    });
  });
});

//  isActive : DONE
router.delete("/:id", decrypt, (req, res, next) => {
  db.getConnection((conerr, connection) => {
    let query = `update tbl_productslist set isActive=? where id=?`;
    if (conerr) return next(conerr.sqlMessage);
    connection.query(query, [req.body.isActive, req.params.id], function (
      err,
      result
    ) {
      connection.release();
      if (err) {
        let data = {
          status: -1,
          message: "Server Error",
          error: err,
        };
        next(data);
      } else if (result.affectedRows > 0) {
        let data = {
          status: 1,
          message: "Data Removed successful",
        };
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
