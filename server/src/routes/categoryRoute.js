const router = require("express").Router()
const categoryController = require("../controllers/categoryController")

router.get("/getCategories", categoryController.getCategories)

module.exports = router
