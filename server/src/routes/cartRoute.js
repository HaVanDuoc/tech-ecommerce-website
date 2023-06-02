const { getCart, increaseQuantity, decreaseQuantity, deleteCartItem, order } = require("../controllers/cartController")

const router = require("express").Router()

router.post("/getCartProduct", getCart)
router.post("/increase", increaseQuantity)
router.post("/decrease", decreaseQuantity)
router.delete("/delete", deleteCartItem)
router.post("/order", order)

module.exports = router
