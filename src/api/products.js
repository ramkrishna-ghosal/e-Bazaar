const router = require('express').Router(); 
const db = require('../configs/mysql');

router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_products`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            if (rows.length > 0) {
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


router.get('/category/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_products where categoryId=?`
        if (err) return res.send(err.sqlMessage);
        connection.query(query,[req.params.id], function (err, rows) {
            connection.release();
            if (rows.length>0) {
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

router.get('/subcategory/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_products where subCategoryId=?`
        if (err) return res.send(err.sqlMessage);
        connection.query(query,[req.params.id], function (err, rows) {
            connection.release();
            if (rows.length>0) {
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
            if (rows.length) {
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
            isActive: 1,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, params, function (err, result) {
            connection.release();
            if (err) return res.json(err);
            if (result.affectedRows > 0) {
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

router.put('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `update tbl_products set ? where id=?`
        let params = {
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            categoryId: req.body.categoryId,
            subCategoryId: req.body.subCategoryId
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [params, req.params.id], function (err, result) {
            connection.release();
            if (err) return res.json(err);
            if (result.affectedRows > 0) {
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

router.delete('/:id', (req, res) => {
    db.getConnection((conerr, connection) => {
        let query = `update tbl_products set isActive=? where id=?`
        if (conerr) return res.send(conerr.sqlMessage);
        connection.query(query, [req.body.isActive,req.params.id], function (err, result) {
            connection.release();
            if (err) return res.json(err);
            if (result.affectedRows > 0) {
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