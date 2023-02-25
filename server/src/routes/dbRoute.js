const express = require("express");
const dbController = require("../controllers/dbController");

const router = express.Router();

router.get("/", dbController.ListTables);

router.get("/getGender", dbController.getGender);

router.get("/listRole", dbController.listRole);

router.get("/statusAccount", dbController.statusAccount);

router.get("/categories", dbController.statusAccount);

module.exports = router;
