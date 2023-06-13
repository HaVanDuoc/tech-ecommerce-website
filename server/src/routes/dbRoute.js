const express = require("express")
const dbController = require("../controllers/dbController")

const router = express.Router()

router.get("/", dbController.ListTables)

router.get("/listCategory", dbController.listCategory)

module.exports = router
