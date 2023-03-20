const { getProduct } = require("../controllers/client/pageProduct/getProduct");

const router = require("express").Router();

router.post("/product", getProduct);

module.exports = router;
