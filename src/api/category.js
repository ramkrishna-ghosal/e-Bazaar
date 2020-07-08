const router = require('express').Router(); //api/category/
const db = require('../configs/mysql');

router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_category`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            let data = {
                status: 1,
                message: "Data fetch successful",
                data: rows
            }
            res.json(data);
        });
    })
});


router.get('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_category where id=${req.params.id}`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            let data = {
                status: 1,
                message: "Data fetch successful",
                data: rows[0]
            }
            res.json(data);
        });
    });

});

router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `insert into tbl_category set ?`
        let params = {
            name: req.body.name,
            isActive: 1
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, params, function (err, rows) {
            connection.release();
            if (err) return res.json(err);
            let data = {
                status: 1,
                message: "Data Insertion successful"
            }
            res.json(data);
        });
    });

});

router.put('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `update tbl_category set ? where id=?`
        let params = {
            name: req.body.name,
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [params, req.params.id], function (err, rows) {
            connection.release();
            if (err) return res.json(err);
            let data = {
                status: 1,
                message: "Data updated successful",
                data: rows
            }
            res.json(data);
        });
    });
});

router.delete('/:id', (req, res) => {
    db.getConnection((conerr, connection) => {
        let query = `update tbl_category set isActive=? where id=?`
        if (conerr) return res.send(conerr.sqlMessage);
        connection.query(query, [req.body.isActive,req.params.id], function (err, result) {
            connection.release();
            if (err) return res.json(err);
            if (result.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data removed successful"
                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Category Id not found"
                }
                res.json(data);
            }

        });
    });
});

module.exports = router;