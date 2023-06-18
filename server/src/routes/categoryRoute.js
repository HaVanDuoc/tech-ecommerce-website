const router = require("express").Router()
const { getCategories, getCategory, updateCategory } = require("../controllers/categoryController")
const decryptToken = require("../middleware/decryptToken")
const verifyToken = require("../middleware/verifyToken")
const verifyRole = require("../middleware/verifyRole")
const uploadCloudinary = require("../middleware/uploadFile")

router.use(decryptToken)

router.get("/getCategories", getCategories)
router.post("/getCategory", getCategory)

router.use(verifyToken)
router.use(verifyRole)

router.put("/updateCategory", uploadCloudinary.array("files"), updateCategory)

module.exports = router
