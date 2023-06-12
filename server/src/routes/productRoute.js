const router = require("express").Router()
const productController = require("../controllers/productsController")
const uploadCloudinary = require("../middleware/uploadFile")
const verifyToken = require("../middleware/verifyToken")
const verifyRole = require("../middleware/verifyRole")
const decryptToken = require("../middleware/decryptToken")

router.use(decryptToken)

router.post("/getProducts", productController.getProducts)
router.post("/getProduct", productController.getProduct)
router.post("/admin/getProducts", productController.getProductsAdmin)
router.put("/updateView", productController.updateView)

router.use(verifyToken)
// router.use(verifyRole);

router.put("/updateImage", uploadCloudinary.array("image"), productController.updateImage)
router.put("/updateInfo", productController.updateInfo)
router.post("/addCart", productController.addCart)
router.post("/order", productController.order)

module.exports = router
