const router = require('express').Router();
const db = require('../configs/mysql');

router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        let data;
        if (err) {
            data = {
                status: -1,
                message: "Server Error",
                error: err
            }
            return res.send(data);
        }
        let query = `select * from tbl_orders order by id desc`
        connection.query(query, function (err, rows) {
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


router.get('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let data;
        if (err) {
            data = {
                status: -1,
                message: "Server Error",
                error: err
            }
            return res.json(data);
        }
        let query = `select * from tbl_orders where id=${req.params.id}`
        connection.query(query, function (err, rows) {
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
    });

});

/* customerId	deliveryAddress	billingAddress	orderDetails	amount	payment
orderDetails=> variantId	quantity	amount
*/
router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `insert into tbl_orders set ?`;
        let params = {
            customerId: req.userId,
            deliveryAddress: req.body.deliveryAddress,
            billingAddress: req.body.billingAddress,
            orderDetails: req.body.orderDetails,
            amount: req.body.amount,
            payment: req.body.payment,
            orderStatus: 'Placed',
            trackingNo: '',
            createdat: new Date().toISOString()
        }
        if (err) {
            data = {
                status: -1,
                message: "Error Occurred",
                error: err
            }
            return res.json(data);
        }
        connection.query(query, params, function (err, rows) {
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occurred",
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
                    message: "Unable to Insert"
                }
            }
            res.json(data);
        });
    });

});

router.put('/:id', (req, res) => {
    return res.send({ status: 0, message: "Forbidden" })
    db.getConnection((err, connection) => {
        let query = `update tbl_productvariants set ? where id=?`
        let params = {
            variantId: req.body.variantId,
            image: req.body.image,
            price: req.body.price,
            discountPrice: req.body.discountPrice,
            stock: req.body.stock,
            label: req.body.label,
            productId: req.body.productId
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
    db.getConnection((err, connection) => {
        if (err) {
            data = {
                status: -1,
                message: "Server Error",
                error: err
            }
            return res.send(data);
        }
        let data = {
            orderStatus: req.body.status,
            updatedat: new Date().toISOString()
        }
        let query = `update tbl_orders set ? where id=?`
        connection.query(query, [data, req.params.id], function (err, rows) {
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occurred",
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
                    message: "Unable to Delete"
                }
            }
            res.json(data);
        });
    });
});

module.exports = router;