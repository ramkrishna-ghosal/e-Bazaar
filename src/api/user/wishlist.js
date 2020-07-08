const router = require('express').Router();
const db = require('../../configs/mysql');
const verifyToken = require('../../utils/verifyToken');

//id	customerId	productId	variantId	quantity	updatedat
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
        let query = `select * from tbl_wishlist where customerId=?`
        query =`select a.*,b.name,b.description,b.tags,c.image,c.price,c.discountPrice,c.stock,c.label from tbl_wishlist as a INNER JOIN tbl_products as b inner join tbl_productvariants as c ON a.productId=b.productId and a.variantId=c.variantId where a.customerId=?`
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

        let query = `insert into tbl_wishlist set ?`;

        let params = {
            customerId: req.userId,
            productId: req.body.productId,
            variantId: req.body.variantId,
            createdat: new Date().toISOString()
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
        let query = `delete from tbl_wishlist where id=? and customerId=?`
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


router.all('/:id', (req, res) => {
    return res.json({ status: -1, message: "Forbidden" })
    
});
module.exports = router;