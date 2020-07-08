const router = require('express').Router();

const userRoutes = require('./user/routes');
const adminRoutes = require('./admin/routes');


// const category = require('./category')
// const orders = require('./orders')
// const product = require('./products')
// const productVariant = require('./productVariant')
// const review = require('./review')
// const subcategory = require('./subcategory')


// router.use('/categories', category);
// router.use('/subcategories', subcategory);
// router.use('/products', product);
// router.use('/productVariants', productVariant);
// router.use('/orders', orders);
// router.use('/reviews', review);

router.use('/user',userRoutes)
router.use('/admin',adminRoutes)

module.exports = router;