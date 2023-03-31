const { productsController } = require("../../../controllers/client/products");

const router = require("express").Router();

router.post("/", productsController);

module.exports = router;
