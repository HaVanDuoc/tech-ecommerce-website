const { handleAddCart } = require("../../../controllers/client/productDetails/handleAddCart")
const { sectionBrands } = require("../../../controllers/client/productDetails/sectionBrands")

const router = require("express").Router()

router.post("/sectionBrands", sectionBrands)
router.post("/addCart", handleAddCart)

module.exports = router
