const express = require("express");
const dbController = require("../controllers/dbController");

const router = express.Router();

router.get("/getGender", dbController.getGender);

router.get("/listRole", dbController.listRole);

router.get("/statusAccount", dbController.statusAccount);

module.exports = router;
