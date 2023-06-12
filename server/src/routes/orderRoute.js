const decryptToken = require("../middleware/decryptToken")
const { getOrder, getTabs, destroyOrder } = require("../controllers/orderController")

const router = require("express").Router()

router.use(decryptToken)

router.post("/getOrders", getOrder)
router.get("/getTabs", getTabs)
router.post("/destroyOrder", destroyOrder);

module.exports = router
