const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const verifyRole = require("../middleware/verifyRole")
const decryptToken = require("../middleware/decryptToken")
const {
    getUsers,
    createUser,
    getUser,
    getStatus,
    updateUser,
    deleteUser,
    getRoles,
    getGender,
    searchUser,
    updateAvatar,
} = require("../controllers/userControllers")
const { test } = require("../controllers/testController")

const router = express.Router()

router.use(decryptToken)

router.get("/test", test)

router.post("/getUsers", getUsers)
router.post("/getUser", getUser)
router.get("/getStatus", getStatus)
router.get("/getRoles", getRoles)
router.get("/getGender", getGender)
router.post("/search", searchUser)

router.use(verifyRole)
router.use(verifyToken)

router.post("/createUser", createUser)
router.put("/updateUser/:userId", updateUser)
router.delete("/:userId", deleteUser)
router.put("/updateAvatar", updateAvatar)

module.exports = router
