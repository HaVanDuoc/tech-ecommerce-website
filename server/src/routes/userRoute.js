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
} = require("../controllers/userControllers")

const router = express.Router()

router.use(decryptToken)

router.post("/getUsers", getUsers)
router.get("/getUser/:userId", getUser)
router.get("/getStatus", getStatus)
router.get("/getRoles", getRoles)
router.get("/getGender", getGender)

router.use(verifyToken)
router.use(verifyRole)

router.post("/createUser", createUser)
router.put("/updateUser/:userId", updateUser)
router.delete("/:userId", deleteUser)

module.exports = router
