const router = require('express').Router();
const db = require('../../configs/mysql');
const verifyToken = require('../../utils/verifyToken');

router.use(verifyToken);

/*
sql for product details:
select b.id,b.variantId,b.quantity,b.amount,c.image,c.price,c.discountPrice,c.stock,c.label,d.name,d.description from tbl_orderedProducts as b inner join tbl_productvariants as c inner join tbl_products as d
on b.variantId=c.variantId and c.productId=d.productId where b.orderNo='ORD-0000002' order by b.id desc

sql for order details:
select * from tbl_orders where customerid='USR-0000001'
*/
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
        let query = `select * from tbl_orders where customerId=? order by id desc`
        connection.query(query, req.userId, function (err, rows) {
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occurred",
                    error: err
                }
            }
            else if (rows.length > 0) {
                let orders = rows;
                orders.map((row, key) => {
                    sql = `select b.id,b.variantId,b.quantity,b.amount,c.image,c.price,c.discountPrice,c.stock,c.label,d.name,d.description from tbl_orderedProducts as b inner join tbl_productvariants as c inner join tbl_products as d on b.variantId=c.variantId and c.productId=d.productId where b.orderNo=?`;
                    connection.query(sql, row.orderNo, (err, rows) => {
                        if (err) {

                        }
                        else if (rows.length > 0) {
                            row.productDetails = rows;
                            if (key == orders.length - 1) {
                                data = {
                                    status: 1,
                                    message: "Data fetch successful",
                                    data: orders
                                }
                                res.json(data)
                            }
                        }
                    })
                })

            }
            else {
                data = {
                    status: 0,
                    message: "No Data Found"
                }
                res.json(data);
            }
        });
    })
});

/* 	
deliveryAddress	billingAddress	orderDetails	amount	payment
orderDetails=> variantId	quantity	amount
*/
router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `insert into tbl_orders set ?`;
        let params = {
            customerId: req.userId,
            deliveryAddress: req.body.deliveryAddress,
            billingAddress: req.body.billingAddress,
            // orderDetails: JSON.stringify(req.body.orderDetails),
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
            // connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occurred",
                    error: err
                }
            }
            else if (rows.affectedRows > 0) {
                //insert data to ordered products
                query = `SELECT orderNo FROM tbl_orders ORDER BY id desc limit 1`
                connection.query(query, params, function (err, rows) {
                    // connection.release();
                    if (err) {
                        data = {
                            status: -1,
                            message: "Error Occurred",
                            error: err
                        }
                    }
                    else if (rows.length > 0) {
                        let temp = req.body.orderDetails;
                        let param = temp.map(val => {
                            return [rows[0].orderNo, ...Object.values(val), new Date().toISOString()]
                        })
                        query = 'insert into tbl_orderedProducts(orderNo,variantId,quantity,amount,createdat) values ?';
                        connection.query(query, [param], function (err, rows) {
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
                                    message: "Unable to insert"
                                }
                            }
                            res.json(data);


                        })
                    }
                });


            }
            else {
                data = {
                    status: 0,
                    message: "Unable to Insert"
                }
                res.json(data);

            }
        });
    });

});

router.put('/cancel/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let data;
        let query = `update tbl_orders set ? where id=?`
        let params = {
            orderStatus: 'Cancelled',
            updatedat: new Date().toISOString()
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [params, req.params.id], function (err, rows) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                res.json(data);
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
                    message: "Data update failed"
                }
            }
            res.json(data);
        });
    });
});

router.all('/', (req, res) => {
    return res.json({ status: -1, message: "Forbidden" })
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