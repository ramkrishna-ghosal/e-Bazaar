//PATH : api/subcategories

const router = require('express').Router(); 
const config = require('../../configs/appconfig');
let db;
router.use((req,res,next)=>{
    db = config[req.env].mysql;
    next();
})

router.get('/cat/:catid', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_subcategory where categoryId=?`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, [req.params.catid], function (err, rows) {
            connection.release();
            if(err){
                let data = {
                    status: -1,
                    message: "Server Error",
                    error:err
                }
                res.json(data);
            }
            else if (rows.length > 0) {
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
        let query = `select * from tbl_subcategory where id=?`;
        if (err) return res.send(err.sqlMessage);
        connection.query(query, req.params.id,function (err, rows) {
            connection.release();
            if(err){
                let data = {
                    status: -1,
                    message: "Server Error",
                    error:err
                }
                res.json(data);
            }
            else if (rows.length > 0) {
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

router.get('/categoryid/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select a.categoryId,a.name as categoryName,b.subCategoryId,b.name as subCategoryName from tbl_category as a, tbl_subcategory as b where 
        b.subCategoryId=? and a.categoryId=b.categoryId`;
        if (err) return res.send(err.sqlMessage);
        connection.query(query, req.params.id,function (err, rows) {
            connection.release();
            if(err){
                let data = {
                    status: -1,
                    message: "Server Error",
                    error:err
                }
                res.json(data);
            }
            else if (rows.length > 0) {
                let data = {
                    status: 1,
                    message: "Data updated successful",
                    data: rows[0]
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
// categoryId,name
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
            if (rows.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data inserted successful"
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

// categoryId,name
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
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error:err
                }
                res.json(data);
            }
            else if (results.affectedRows > 0) {
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

// isActive
router.delete('/:id', (req, res) => {
    db.getConnection((conerr, connection) => {
        let query = `update tbl_subcategory set isActive=? where id=?`
        if (conerr) return res.send(conerr.sqlMessage);
        connection.query(query, [req.body.isActive,req.params.id], function (err, results) {
            connection.release();
            if (err) {
                let data = {
                    status: -1,
                    message: "Server Error",
                    error:err
                }
                res.json(data);
            }
            else if(results.affectedRows>0){
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