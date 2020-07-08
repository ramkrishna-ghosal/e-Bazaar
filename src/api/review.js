const router = require('express').Router();
const db = require('../configs/mysql');
//id	customerId	orderNo	productId	variantId	rating	reviewText	
//remarksByAdmin	isActive	updatedat ** tbl_review

router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_review where customerId=? and isActive=1`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [req.userId], function (err, rows) {
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
        let query = `select * from tbl_review where productId=${req.params.id}`
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
    });

});

router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `insert into tbl_review set ?`;
        let params = {
            customerId: req.userId,
            orderNo: req.body.orderNo,
            productId: req.body.productId,
            variantId: req.body.variantId,
            rating: req.body.rating,
            reviewText: '',
            isActive: 1,
            updatedat: new Date().toISOString()
        }
        req.body.reviewText ? params.reviewText = req.body.reviewText : delete params.reviewText;
        if (err) return res.send(err.sqlMessage);
        connection.query(query, params, function (err, rows) {
            connection.release();
            if (err) return res.json(err);
            let data = {
                status: 1,
                message: "Data inserted successful",
                data: rows
            }
            res.json(data);
        });
    });

});

router.all('/:id', (req, res) => {
    return res.status(403).json({ status: 0, message: "Forbidden" })
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
    return res.send({ status: 0, message: "Forbidden" })
    db.getConnection((conerr, connection) => {

        let query = `delete from tbl_wishlist set where id=?`
        if (conerr) return res.send(conerr.sqlMessage);
        connection.query(query, [req.params.id], function (err, rows) {
            connection.release();
            if (err) return res.json(err);
            let data = {
                status: 1,
                message: "Data removed successful",
                data: rows
            }
            res.json(data);
        });
    });
});

module.exports = router;