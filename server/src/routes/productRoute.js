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
router.post("/search", productController.searchProduct)

router.use(verifyToken)

router.post("/addCart", productController.addCart)
router.post("/checkNameProduct", productController.checkNameProduct)

router.use(verifyRole)

router.put("/updateInfo", productController.updateInfo)
router.put("/updateImage", uploadCloudinary.array("image"), productController.updateImage)
router.post("/createProduct", uploadCloudinary.array("files"), productController.createProduct)

module.exports = router
