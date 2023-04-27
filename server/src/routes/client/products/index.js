const { productsController } = require("../../../controllers/client/products");
const { setView } = require("../../../controllers/client/products/setView");

const router = require("express").Router();

router.post("/", productsController);
router.post("/setView", setView);

module.exports = router;
