const router = require("express").Router();

const auth = require("./auth");
const address = require("./address");
const cart = require("./cart");
const wishlist = require("./wishlist");
const orders = require("./orders");

router.use("/auth", auth);
router.use("/address", address);
router.use("/cart", cart);
router.use("/wishlists", wishlist);
router.use("/orders", orders);

module.exports = router;
