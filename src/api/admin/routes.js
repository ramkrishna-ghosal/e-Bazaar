const router = require("express").Router();
const verifyToken = require("../../utils/verifyToken");

const auth = require("./auth");
const category = require("./category");
const orders = require("./orders");
const products = require("./products");
const subcategory = require("./subcategory");
const dashboard = require("./dashboard");

router.use("/auth", auth);
// router.use(verifyToken);
router.use("/categories", category);
router.use("/subcategories", subcategory);
router.use("/products", products);
router.use("/orders", orders);
router.use("/dashboard", dashboard);



module.exports = router;
