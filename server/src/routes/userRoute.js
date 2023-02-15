const express = require("express");
const userController = require("../controllers/userControllers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// router.use(verifyToken);

router.get("/", userController.getCurrent);

router.post("/newUser", userController.newUser);

module.exports = router;
