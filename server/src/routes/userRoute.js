const express = require("express");
const controllers = require("../controllers");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// PRIVATE ROUTE
router.use(verifyToken);

router.get("/", controllers.userController);
