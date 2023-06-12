const router = require("express").Router()
const { headerSuggest, headerRecent, headerSaveRecent } = require("../controllers/searchController")
const decryptToken = require("../middleware/decryptToken")

router.use(decryptToken)

// HEADER
router.post("/header/getSuggest", headerSuggest)
router.post("/header/getRecent", headerRecent)
router.post("/header/saveRecent", headerSaveRecent)

module.exports = router
