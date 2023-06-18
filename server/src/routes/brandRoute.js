const router = require("express").Router()
const { getBrands, getBrand, updateBrand } = require("../controllers/brandController")
const decryptToken = require("../middleware/decryptToken")
const uploadCloudinary = require("../middleware/uploadFile")
const verifyToken = require("../middleware/verifyToken")
const verifyRole = require("../middleware/verifyRole")

router.use(decryptToken)

router.post("/getBrands", getBrands)
router.post("/getBrand", getBrand)

router.use(verifyToken)
router.use(verifyRole)

router.put("/updateBrand", uploadCloudinary.array("files"), updateBrand)

module.exports = router
