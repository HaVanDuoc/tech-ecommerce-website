const decryptToken = require("../middleware/decryptToken")
const {
    getOrder,
    getTabs,
    destroyOrder,
    getOrderDetails,
    createOrder,
    handleOrderStatus,
    handleIncrease,
    handleDecrease,
    handleAddProduct,
    handleDelete,
    createOrderAdmin,
} = require("../controllers/orderController")
const verifyToken = require("../middleware/verifyToken")
const verifyRole = require("../middleware/verifyRole")

const router = require("express").Router()

router.use(decryptToken)

router.post("/getOrders", getOrder)
router.get("/getTabs", getTabs)
router.post("/getOrderDetails", getOrderDetails)

router.use(verifyToken)
router.use(verifyRole)

router.post("/destroyOrder", destroyOrder)
router.post("/createOrder", createOrder)
router.post("/admin/createOrder", createOrderAdmin)
router.post("/handleOrderStatus", handleOrderStatus)
router.post("/orderDetails/increase", handleIncrease)
router.post("/orderDetails/decrease", handleDecrease)
router.post("/orderDetails/addProduct", handleAddProduct)
router.delete("/orderDetails/delete", handleDelete)

module.exports = router
