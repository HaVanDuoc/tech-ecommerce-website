const router = require("express").Router()
const productController = require("../controllers/productsController")
const uploadCloudinary = require("../middleware/uploadFile")

router.post("/getProducts", productController.getProducts)
router.post("/getProduct", productController.getProduct)
router.put("/updateImage", uploadCloudinary.array("image"), productController.updateImage)
router.put("/updateInfo", productController.updateInfo)

module.exports = router
