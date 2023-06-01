const express = require("express")
const { checkCurrentUser } = require("../middleware/checkCurrentUser")
const { getCurrentUser, register, login } = require("../controllers/authControllers")

const router = express.Router()

router.get("/getCurrentUser", checkCurrentUser, getCurrentUser)

router.post("/register", register)

router.post("/login", login)

module.exports = router
