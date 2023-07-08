const {
    getCart,
    increaseQuantity,
    decreaseQuantity,
    deleteCartItem,
    counterProducts,
} = require("../controllers/cartController")
const decryptToken = require("../middleware/decryptToken")
const verifyToken = require("../middleware/verifyToken")

const router = require("express").Router()

router.use(decryptToken)

router.post("/getCartProduct", getCart)
router.get("/counter", counterProducts)

router.use(verifyToken)

router.post("/increase", increaseQuantity)
router.post("/decrease", decreaseQuantity)
router.delete("/delete", deleteCartItem)

module.exports = router
