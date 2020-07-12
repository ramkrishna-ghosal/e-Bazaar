//PATH: api/user/address

const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
// const db = require('../../configs/mysql');

const decrypt = require("../../utils/crypto");
// var tokenConfig = require('../../configs/tokenConfigs');
const config = require("../../configs/appconfig");
let db;
router.use((req, res, next) => {
  db = config.mysql;
  next();
});



router.use(verifyToken);

router.get('/', (req, res, next) => {
    let data;
    let sql = `select id,label,houseno,address1,address2,area,pincode,contactPersonName,contactPersonPhone,isdefault from tbl_address where userId=? and isActive=true`;
    db.getConnection((err, connection) => {
        if (err) return next(err.sqlMessage);
        connection.query(sql, [req.userId], (err, result) => {
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occured",
                    error: err
                }
            }
            else if (result.length > 0) {
                data = {
                    status: 1,
                    message: "Data Fetched",
                    data: result
                };
            }
            else {
                data = {
                    status: 0,
                    message: "No Records Found"
                };
            }
            connection.release();
            next(data);
        })
    })


})

router.get('/:id', (req, res, next) => {
    let data;
    let sql = `select label,houseno,address1,address2,area,pincode,contactPersonName,contactPersonPhone,isdefault from
    tbl_address where userId='${req.userId}' and id=${req.params.id} and isActive=true`;
    db.getConnection((err, connection) => {
        if (err) return next(err.sqlMessage);

        connection.query(sql, (err, result) => {
            // console.log(sql,result)
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occured",
                    error: err
                };
            }
            else if (result[0]) {
                data = {
                    status: 1,
                    message: "Data Fetched",
                    data: result[0]
                };
            }
            else {
                data = {
                    status: 0,
                    message: "No Records Found"
                }
            }
            next(data);
        })
    });
})

/**
 params: label,houseNo,address1,address2,area,pincode,contactPersonName,contactPersonPhone,isdefault
 DONE
 */
router.post('/', decrypt, (req, res, next) => {
    let data;
    let sql = `select count(*) as count from tbl_address where label=? and userId=? and isActive=true`;
    db.getConnection((err, connection) => {
        if (err) {
            data = {
                status: -1,
                message: "SQL Error",
                error: err
            }
            next(data);
        }
        else {
            connection.query(sql, [req.body.label, req.userId], (err, result) => {
                if (err) {
                    connection.release();
                    data = {
                        status: -1,
                        message: "Server Error",
                        error: err
                    }
                    next(data);
                }
                else if (result[0].count === 0) {
                    let data = {
                        label: req.body.label,
                        houseno: req.body.houseno,
                        address1: req.body.address1,
                        address2: req.body.address2,
                        area: req.body.area,
                        pincode: req.body.pincode,
                        contactPersonName: req.body.contactPersonName,
                        contactPersonPhone: req.body.contactPersonPhone,
                        userId: req.userId,
                        createdat: new Date().toISOString().replace('T', ' ').replace('Z',''),
                        isActive: true
                    }
                    let sql = `select count(*) as count from tbl_address where isdefault=1 and userId=? and isActive=true`;
                    connection.query(sql, [req.userId], (err, result) => {
                        if (err) {
                            connection.release();
                            data = {
                                status: -1,
                                message: "Server Error",
                                error: err
                            }
                            next(data);
                        }
                        else if (result[0].count === 0) {
                            data.isdefault = 1;
                        }
                        else {
                            data.isdefault = 0;
                        }
                        sql = 'insert into tbl_address set ?'
                        connection.query(sql, [data], (err, result) => {
                            connection.release();
                            if (err) {
                                data = {
                                    status: -1,
                                    message: "Server Error",
                                    error: err
                                }
                                next(data);
                            }
                            else if (result.affectedRows > 0) {
                                data = {
                                    status: 1,
                                    message: "Data Inserted"
                                }
                                next(data);
                            }
                            else {
                                data = {
                                    status: 0,
                                    message: "Unable to Insert records"
                                }
                                next(data);
                            }
                        });
                    });

                }
                else {
                    connection.release();
                    data = {
                        status: 0,
                        message: "Address already exists"
                    }
                    next(data);
                }
            });
        }
    });
})

/* 
params: label,houseNo,address1,address2,area,pincode,
        contactPersonName,contactPersonPhone
         DONE
*/
router.put('/:id', decrypt, (req, res, next) => {
    let data;
    // console.log(Object.keys(req.body));return
    // if (req.body.isActive) {
    //     delete req.body.isActive;
    // }
    // console.log(req.body, req.userId);
    
    let sql = `select count(*) as count from tbl_address where id<>? and label=? and userId=? and isActive=1`
    db.getConnection((err, connection) => {
        if (err) return next(err.sqlMessage);
        connection.query(sql, [req.params.id, req.body.label, req.userId], (err, result) => {
            // console.log(result);
            
            if (err) {
                connection.release();
                data = {
                    status: -1,
                    message: "Error Occured",
                    error: err
                }
                next(data);
            }
            else if (result[0].count === 0) {
                data = {
                    label: req.body.label,
                    houseno: req.body.houseno,
                    address1: req.body.address1,
                    address2: req.body.address2,
                    area: req.body.area,
                    pincode: req.body.pincode,
                    contactPersonName: req.body.contactPersonName,
                    contactPersonPhone: req.body.contactPersonPhone,
                    updatedat: new Date().toISOString().replace('T', ' ').replace('Z', '')
                }
                sql = 'UPDATE tbl_address SET ? where id=? and isActive=true'
                connection.query(sql, [data, req.params.id], (err, result) => {
                    connection.release();
                    if (err) {
                        data = {
                            status: -1,
                            message: "Error Occured",
                            error: err
                        }
                    }
                    else if (result.affectedRows > 0) {
                        data = {
                            status: 1,
                            message: "Data Updated Successfully"
                        }
                    }
                    else {
                        data = {
                            status: 0,
                            message: "No Records Found"
                        }
                    }
                    next(data);
                })
            }
            else {
                connection.release();
                data = {
                    status: 0,
                    message: "Label already exists"
                }
                next(data);

            }
        })
    });


})

router.put('/default/:id', (req, res, next) => {
    let data;
    // console.log(Object.keys(req.body));return
    // if (req.body.isActive) {
    //     delete req.body.isActive;
    // }
    let sql = `UPDATE tbl_address SET isdefault=0 where userId=? and isActive=1`
    db.getConnection((err, connection) => {
        if (err) return next(err.sqlMessage);
        connection.query(sql, [req.userId], (err, result) => {
            if (err) {
                connection.release();
                data = {
                    status: -1,
                    message: "Error Occured",
                    error: err
                }
                next(data);
            }
            else if (result.affectedRows > 0) {
                sql = `UPDATE tbl_address SET isdefault=1 where id=? and userId=? and isActive=1`;
                connection.query(sql, [req.params.id, req.userId], (err, result) => {
                    connection.release()
                    if (err) {
                        data = {
                            status: -1,
                            message: "Error Occured",
                            error: err
                        }
                    }
                    else if (result.affectedRows > 0) {
                        data = {
                            status: 1,
                            message: "Default address updated"
                        }
                    }
                    else {
                        data = {
                            status: 0,
                            message: "No Data present"
                        }
                    }
                    next(data);
                });
            }
            else {
                connection.release();
                data = {
                    status: 0,
                    message: "No Data present"
                }
                next(data);

            }

        })
    });


})

/*
params : isActive
*/
router.delete('/:id', (req, res, next) => {
    let data = {
        updatedat: new Date().toISOString().replace('T', ' ').replace('Z',''),
        isActive: 0
    }
    let sql = `UPDATE tbl_address SET ? where id=? and userId=? and isActive=1`;
    db.getConnection((err, connection) => {
        if (err) return next(err.sqlMessage);
        connection.query(sql, [data, req.params.id, req.userId], (err, result) => {
            connection.release();
            if (err) {
                data = {
                    status: -1,
                    message: "Error Occured",
                    error: err
                }
            }
            else if (result.affectedRows > 0) {
                data = {
                    status: 1,
                    message: "Data Removed Successfully"
                }
            }
            else {
                data = {
                    status: 0,
                    message: "No Records Found"
                };
            }
            next(data);
        })
    });
})

module.exports = router;