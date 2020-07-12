const router = require('express').Router();
const verifyToken = require('../../utils/verifyToken');

const decrypt = require("../../utils/crypto");
// var tokenConfig = require('../../configs/tokenConfigs');
const config = require("../../configs/appconfig");

let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});

router.use(verifyToken);

/*
sql for product details:
select b.id,b.variantId,b.quantity,b.amount,c.image,c.price,c.discountPrice,c.stock,c.label,d.name,d.description from tbl_orderedProducts as b inner join tbl_productvariants as c inner join tbl_products as d
on b.variantId=c.variantId and c.productId=d.productId where b.orderNo='ORD-0000002' order by b.id desc

sql for order details:
select * from tbl_orders where customerid='USR-0000001'
*/
router.get('/', (req, res, next) => {
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
                data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows
                }
                next(data)
            }
            else {
                data = {
                    status: 0,
                    message: "No Data Found"
                }
                next(data);
            }
        });
    })
});

/* 	
deliveryAddress	billingAddress	orderDetails	amount	payment
*/
router.post('/', decrypt, (req, res, next) => {
    // console.log(req.body);
    db.getConnection((err, connection) => {
        // console.log(err, connection)
        let query = `insert into tbl_orders set ?`;
        let params = {
            customerId: req.userId,
            deliveryAddress:  JSON.stringify(req.body.deliveryAddress),
            billingAddress:  JSON.stringify(req.body.billingAddress),
            products: JSON.stringify(req.body.orderDetails),
            amount: req.body.amount,
            payment: req.body.payment,
            orderStatus: 'Placed',
            trackingNo: '',
            createdat: new Date().toISOString().replace('T', ' ').replace('Z', '')
        }
        if (err) {
            data = {
                status: -1,
                message: "Error Occurred",
                error: err
            }
            return next(data);
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
                        data = {
                            status: 1,
                            message : "Order Placed",
                            data : {
                                orderNo: rows[0].orderNo
                            }
                        }
                    }
                    next(data);
                });
            }
            else {
                data = {
                    status: 0,
                    message: "Unable to Insert"
                }
                next(data);

            }
        });
    });

});

router.put('/cancel/:id', (req, res, next) => {
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
                next(data);
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
            next(data);
        });
    });
});

router.all('/', (req, res, next) => {
    return next({ status: -1, message: "Forbidden" })
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
            next(data);
        });
    });
});

module.exports = router;