const router = require('express').Router();
const db = require('../../configs/mysql');
const verifyToken = require('../../utils/verifyToken');



router.use(verifyToken);



router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            data = {
                status: -1,
                message: "Server Error",
                error: err
            }
            return res.send(data);
        }
        let query = `select * from tbl_cart where customerId=?`
        query = `select a.*,b.name,b.description,b.tags,c.image,c.price,c.discountPrice,c.stock,c.label from tbl_cart as a,tbl_products as b,tbl_productvariants as c where a.productId=b.productId and a.variantId=c.variantId and a.customerId=?`
        connection.query(query, [req.userId], function (err, rows) {
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occurred",
                    error: err
                }
            }
            else if (rows.length > 0) {
                data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows
                }
            }
            else {
                data = {
                    status: 0,
                    message: "No Data Found"
                }
            }
            res.json(data);
        });
    })
});



router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            data = {
                status: -1,
                message: "Server Error",
                error: err
            }
            return res.json(data);
        }
        let data;

        let query = `insert into tbl_cart set ?`;

        let params = {
            customerId: req.userId,
            productId: req.body.productId,
            variantId: req.body.variantId,
            quantity: req.body.quantity,
            updatedat: new Date().toISOString()
        }
        connection.query(query, params, function (err, rows) {
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
            }
            else if (rows.affectedRows > 0) {
                data = {
                    status: 1,
                    message: "Data inserted successful"
                }
            }
            else {
                data = {
                    status: 0,
                    message: "Failed To Insert"
                }
            }
            res.json(data);
        });
    });

});

router.put('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `update tbl_cart set ? where id=? and customerId=?`
        let params = {
            quantity: req.body.quantity,
            updatedat: new Date().toISOString()
        }
        let data;
        if (err) {
            data = {
                status: -1,
                message: "Server Error",
                error: err
            }
            return res.json(data);
        }
        connection.query(query, [params, req.params.id, req.userId], function (err, rows) {
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
            }
            else if (rows.affectedRows > 0) {
                data = {
                    status: 1,
                    message: "Data updated successful"
                }
            }
            else {
                data = {
                    status: 0,
                    message: "Unable to Update"
                }
            }
            res.json(data);
        });
    });
});

router.delete('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            data = {
                status: -1,
                message: "Server Error",
                error: err
            }
            return res.json(data);
        }
        let query = `delete from tbl_cart where id=? and customerId=?`
        connection.query(query, [req.params.id, req.userId], function (err, rows) {
            let data;
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
            }
            else if (rows.affectedRows > 0) {
                data = {
                    status: 1,
                    message: "Data removed successful"
                }
            }
            else {
                data = {
                    status: 0,
                    message: "Wrong Id provided"
                }
            }
            res.json(data);
        });
    });
});

module.exports = router;