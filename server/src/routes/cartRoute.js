const { getCart, increaseQuantity, decreaseQuantity, deleteCartItem, order } = require("../controllers/cartController")
const decryptToken = require("../middleware/decryptToken")

const router = require("express").Router()

router.use(decryptToken)

router.post("/getCartProduct", getCart)
router.post("/increase", increaseQuantity)
router.post("/decrease", decreaseQuantity)
router.delete("/delete", deleteCartItem)

module.exports = router
