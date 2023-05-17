const { createOrder } = require("../../controllers/admin/orders/createOrder");
const { findCustomer } = require("../../controllers/admin/orders/findCustomer");
const { getOrderDetails } = require("../../controllers/admin/orders/getOrderDetails");
const { getOrders } = require("../../controllers/admin/orders/getOrders");
const { getUser } = require("../../controllers/admin/orders/getUser");
const { handleAddProduct } = require("../../controllers/admin/orders/handleAddProduct");
const { handleDecrease } = require("../../controllers/admin/orders/handleDecrease");
const { handleDelete } = require("../../controllers/admin/orders/handleDelete");
const { handleIncrease } = require("../../controllers/admin/orders/handleIncrease");
const { handleOrderStatus } = require("../../controllers/admin/orders/handleOrderStatus");
const verifyToken = require("../../middleware/verifyToken");
const verifyRole = require("../../middleware/verifyRole");

const router = require("express").Router();

router.post("/getOrders", getOrders);
router.post("/getOrderDetails", getOrderDetails);
router.post("/createOrder/getUser", getUser)
router.post("/findCustomer", findCustomer)

router.use(verifyToken);
router.use(verifyRole);

router.post("/createOrder/create", createOrder)
router.post("/handleOrderStatus", handleOrderStatus);
router.post("/orderDetails/increase", handleIncrease);
router.post("/orderDetails/decrease", handleDecrease);
router.post("/orderDetails/addProduct", handleAddProduct);
router.post("/orderDetails/delete", handleDelete);

module.exports = router;
