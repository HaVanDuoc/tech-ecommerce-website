const express = require("express")
const authController = require("../controllers/authControllers")
const middleware = require("../middleware")

const router = express.Router()

router.post("/login", authController.login)

router.post("/register", middleware.checkEmail, middleware.verifyEmailRegister, authController.register)

router.get("/getCurrentUser", middleware.checkCurrentUser, authController.getCurrentUser)

router.post("/getCode", middleware.checkExistEmail, authController.getCode)

router.post("/verifyCode", authController.verifyCode)

router.put("/changePassword", authController.changePassword)

module.exports = router
