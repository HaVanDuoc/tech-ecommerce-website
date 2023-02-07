const express = require("express");
const getCurrent = require("../controllers/userControllers");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// PRIVATE ROUTE
router.use(verifyToken);

router.get("/", getCurrent);

module.exports = router;
