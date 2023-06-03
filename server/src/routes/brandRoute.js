const router = require("express").Router()
const brandController = require("../controllers/brandController")

router.post("/getBrandsByCategory", brandController.getBrands)

module.exports = router
