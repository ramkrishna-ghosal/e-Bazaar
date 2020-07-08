const router = require('express').Router(); //api/category/
const db = require('../configs/mysql');

router.get('/', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_productvariants`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            if(rows.length>0){
                let data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows
                }
                res.json(data);
            }
            else{
                let data = {
                    status: 0,
                    message: "No data found"
                }
                res.json(data);
            }
            
        });
    })
});


router.get('/:id', (req, res) => {
    db.getConnection((err, connection) => {
        let query = `select * from tbl_productvariants where id=${req.params.id}`
        if (err) return res.send(err.sqlMessage);
        connection.query(query, function (err, rows) {
            connection.release();
            if(rows.length>0){
                let data = {
                    status: 1,
                    message: "Data fetch successful",
                    data: rows[0]
                }
                res.json(data);
            }
            else{
                let data = {
                    status: 0,
                    message: "No data found"
                }
                res.json(data);
            }
        });
    });

});

router.post('/', (req, res) => {
    db.getConnection((err, connection) => {
        //let temp = req.protocol + '://' + req.get('host') + req.body.image;
        let query = `insert into tbl_productvariants set ?`
        let params  = {
            image:req.body.image,
            price:req.body.price,
            discountPrice:req.body.discountPrice,
            stock:req.body.stock,
            label:req.body.label,
            productId:req.body.productId,
            isActive:1
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query,params, function (err, result) {
            connection.release();
            if(err) return res.json(err);
            if (result.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data Inserted successful"

                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Data was not Inserted"
                }
                res.json(data);
            }
        });
    });

});

router.put('/:id', (req, res) => {
    db.getConnection((err, connection) => {
     let query = `update tbl_productvariants set ? where id=?`
        let params  = {
            image:req.body.image,
            price:req.body.price,
            discountPrice:req.body.discountPrice,
            stock:req.body.stock,
            label:req.body.label,
            productId:req.body.productId
        }
        if (err) return res.send(err.sqlMessage);
        connection.query(query,[params,req.params.id], function (err, result) {
            connection.release();
            if(err) return res.json(err);
            if (result.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data Edited successful"

                }
                res.json(data);
            }
            else {
                let data = {
                    status: 0,
                    message: "Data not Found"
                }
                res.json(data);
            }
        });
    });
});

router.delete('/:id', (req, res) => {
    db.getConnection((conerr, connection) => {
        let query = `update tbl_productvariants set isActive=? where id=?`
           if (conerr) return res.send(conerr.sqlMessage);
           connection.query(query,[req.body.isActive,req.params.id], function (err, result) {
               connection.release();
               if(err) return res.json(err);
               if (result.affectedRows > 0) {
                let data = {
                    status: 1,
                    message: "Data Removed successful"

                }
                res.json(data);
            }
            else {
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