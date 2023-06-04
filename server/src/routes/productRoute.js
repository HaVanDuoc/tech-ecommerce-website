const router = require("express").Router()
const productController = require("../controllers/productsController")

router.post("/getProducts", productController.getProducts)

module.exports = router
