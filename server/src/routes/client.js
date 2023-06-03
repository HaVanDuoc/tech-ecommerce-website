const router = require("express").Router()
const { showBrand } = require("../controllers/client/showBrand")

router.post("/showBrand", showBrand)

module.exports = router
