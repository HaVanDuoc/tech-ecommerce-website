const router = require("express").Router()
const searchController = require("../controllers/searchController")

// HEADER
router.post("/header/getSuggest", searchController.header.suggest)
router.post("/header/getRecent", searchController.header.recent)
router.post("/header/saveRecent", searchController.header.saveRecent)

module.exports = router
