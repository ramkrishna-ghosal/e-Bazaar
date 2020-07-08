const router = require('express').Router();
const config = require('../../configs/appconfig');
let db;
router.use((req, res, next) => {
    db = config[req.env].mysql;
    next();
})
router.use('/variants/', require('./productVariant'));

router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_products`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
            }
            else if (rows.length > 0) {
                let data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "No data Found"
                }
                res.json(data);
            }

        });
    })
});


router.get('/category/:catid', (req, res) => {
    // console.log('ok');
    db.getConnection((err, connection) => {
        // let query = `select * from tbl_products where categoryId=?`
        query=`select * from tbl_products as a,tbl_productvariants as b where a.categoryId=? and a.productId=b.productId`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [req.params.catid], function (err, rows) {
            let products = [];
            if (err) {
                connection.release();
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
            }
            else if (rows.length > 0) {
                products = rows;
                let data = {
                    status: 0,
                    message: "Data fetched successful",
                    data:products
                }
                return res.json(data);
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
                                error: err
                            }
                            return res.json(data);
                        }
                        else if (results.length > 0) {
                            product['variants'] = results;
                        }
                    // console.log(index,products.length - 1);

                        if (index === products.length - 1) {
                            return res.json(products);
                        }
                    });
                });

                // let data = {
                //     status: 1,
                //     message: "Data fetch successful",
                //     data: rows
                // }
                // res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "No data Found"
                }
                res.json(data);
            }

        });
    });

});

router.get('/subcategory/:subcatid', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_products where subCategoryId=?`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [req.params.subcatid], function (err, rows) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
            }
            else if (rows.length > 0) {
                let data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "No data Found"
                }
                res.json(data);
            }

        });
    });

});


router.get('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_products where id=${req.params.id}`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
            }
            else if (rows.length) {
                let data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows[0]
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "No data Found"
                }
                res.json(data);
            }

        });
    });

});

router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `insert into tbl_products set ?`
        let params = {
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            image:req.body.image,
            isActive: 1,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, params, function (err, result) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
            }
            else if (result.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data Inserted successful"

                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Error in Inserting Data"
                }
                res.json(data);
            }

        });
    });

});

//  name, description, tags, categoryId, subCategoryId, image
router.put('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `update tbl_products set ? where id=?`
        let params = {
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            image:req.body.image,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [params, req.params.id], function (err, result) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
            }
            else if (result.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data Updated successful"

                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Error in Updating Data"
                }
                res.json(data);
            }

        });
    });
});

//  isActive
router.delete('/:id', (req, res) => {
    db.getConnection((conerr, connection) => {
        let query = `update tbl_products set isActive=? where id=?`
        if (conerr) return res.send(conerr.sqlMessage);
        connection.query(query, [req.body.isActive, req.params.id], function (err, result) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
            }
            else if (result.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data Removed successful"

                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Data not Found"
                }
                res.json(data);
            }
        });
    });
});

module.exports = router;