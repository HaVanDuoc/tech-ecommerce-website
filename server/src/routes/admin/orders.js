const { getOrders } = require("../../controllers/admin/orders/getOrders");
const { handleOrderStatus } = require("../../controllers/admin/orders/handleOrderStatus");

const router = require("express").Router();

router.post("/getOrders", getOrders);
router.post("/handleOrderStatus", handleOrderStatus)

module.exports = router;
