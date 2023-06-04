const { handleAddCart } = require("../../../controllers/client/productDetails/handleAddCart")

const router = require("express").Router()

router.post("/addCart", handleAddCart)

module.exports = router
