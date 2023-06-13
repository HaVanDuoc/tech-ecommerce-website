const router = require("express").Router()
const { getBrands } = require("../controllers/brandController")

router.post("/getBrandsByCategory", getBrands)
router.post("/getBrands", getBrands)

module.exports = router
