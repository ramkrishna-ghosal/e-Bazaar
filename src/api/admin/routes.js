const router = require('express').Router();
const verifyToken = require('../../utils/verifyToken');


const auth = require('./auth')
const category = require('./category')
const orders = require('./orders')
const products = require('./products')
const subcategory = require('./subcategory')



router.use('/auth', auth);
// router.use(verifyToken);
router.use('/categories', category);
router.use('/subcategories', subcategory);
router.use('/products', products);
router.use('/orders', orders);



module.exports = router;