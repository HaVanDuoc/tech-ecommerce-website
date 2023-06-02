const express = require("express")
const authController = require("../controllers/authControllers")
const { checkCurrentUser } = require("../middleware/checkCurrentUser")

const router = express.Router()

router.get("/getCurrentUser", checkCurrentUser, authController.getCurrentUser)

router.post("/register", authController.register)

router.post("/login", authController.login)

module.exports = router
