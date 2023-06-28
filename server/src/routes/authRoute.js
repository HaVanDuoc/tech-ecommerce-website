const express = require("express")
const authController = require("../controllers/authControllers")
const { checkCurrentUser } = require("../middleware/checkCurrentUser")
const verifyEmailRegister = require("../middleware/verifyEmailRegister")
const checkEmail = require("../middleware/checkEmail")

const router = express.Router()

router.get("/getCurrentUser", checkCurrentUser, authController.getCurrentUser)

router.post("/register", checkEmail, verifyEmailRegister, authController.register)

router.post("/login", authController.login)

module.exports = router