const router = require('express').Router(); //api/category/
const db = require('../configs/mysql');

router.get('/cat/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_subcategory where categoryId=?`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [req.params.id], function (err, rows) {
            connection.release();
            if (rows.length > 0) {
                let data = {
                    status: 1,
                    message: "Data updated successful",
                    data: rows
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Wrong Id provided."
                }
                res.json(data);
            }
           
        });
    })
});


router.get('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_subcategory where id=${req.params.id}`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            if (rows.length > 0) {
                let data = {
                    status: 1,
                    message: "Data updated successful",
                    data: rows
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Wrong Id provided."
                }
                res.json(data);
            }
            
        });
    });

});

router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `insert into tbl_subcategory set ?`
        let params = {
            categoryId: req.body.categoryId,
            name: req.body.name,
            isActive: 1
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, params, function (err, rows) {
            connection.release();
            if (err) return res.json(err);
            if (rows.length > 0) {
                let data = {
                    status: 1,
                    message: "Data inserted successful",
                    data: rows
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Unable to Insert records"
                }
                res.json(data);
            }
        });
    });

});

router.put('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `update tbl_subcategory set ? where id=?`
        let params = {
            categoryId: req.body.categoryId,
            name: req.body.name
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [params, req.params.id], function (err, results) {
            connection.release();
            if (err) return res.json(err);
            if (results.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data updated successful"
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Wrong Id provided."
                }
                res.json(data);
            }
        });
    });
});

router.delete('/:id', (req, res) => {
    db.getConnection((conerr, connection) => {
        let query = `update tbl_subcategory set isActive=? where id=?`
        if (conerr) return res.send(conerr.sqlMessage);
        connection.query(query, [req.body.isActive,req.params.id], function (err, results) {
            connection.release();
            if (err) return res.json(err);
            if(results.affectedRows>0){
                let data = {
                    status: 1,
                    message: "Data removed successful"
                }
                res.json(data);
            }
            else{
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