//PATH : api/admin/dashboard

const router = require('express').Router();
const config = require('../../configs/appconfig');

let db;
router.use((req, res, next) => {
    db = config.mysql;
    
    req.type='product';
    next();
})

router.get('/', (req, res, next) => {
    db.getConnection((err, connection) => {
        
        let query = `SELECT
        (SELECT COUNT(*) FROM tbl_category WHERE isActive = 1) as categories, 
        (SELECT COUNT(*) FROM tbl_subcategory WHERE isActive = 1 ) as subCategories,
        (SELECT COUNT(*) FROM tbl_products WHERE isActive = 1 ) as products,
        (SELECT COUNT(*) FROM tbl_auth WHERE userId LIKE 'USR%' and isActive = 1 ) as users,
        (SELECT COUNT(*) FROM tbl_orders WHERE orderStatus='Cancelled') as Cancelled_Orders,
        (SELECT COUNT(*) FROM tbl_orders WHERE orderStatus='Placed') as New_Orders,
        (SELECT COUNT(*) FROM tbl_orders WHERE orderStatus='Ongoing') as Open_Orders,
        (SELECT COUNT(*) FROM tbl_orders WHERE orderStatus='Completed') as Closed_Orders`
        if (err) return next(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error: err
                }
                next(data);
            }
            else if (rows.length > 0) {
                let data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows[0]
                }
                next(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "No data Found"
                }
                next(data);
            }

        });
    })
});



module.exports = router;