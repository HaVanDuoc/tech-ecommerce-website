const express = require("express")
const authController = require("../controllers/authControllers")
const { checkCurrentUser } = require("../middleware/checkCurrentUser")
const verifyEmailRegister = require("../middleware/verifyEmailRegister")
const checkEmail = require("../middleware/checkEmail")
const checkExistEmail = require("../middleware/checkExistEmail")

const router = express.Router()

router.get("/getCurrentUser", checkCurrentUser, authController.getCurrentUser)

router.post("/register", checkEmail, verifyEmailRegister, authController.register)

router.post("/login", authController.login)

router.post("/getCode", checkExistEmail, authController.getCode)

router.post("/verifyCode", authController.verifyCode)

router.put("/changePassword", authController.changePassword)



module.exports = router
