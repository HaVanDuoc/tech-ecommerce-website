const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.post("/register", controllers.register);

router.post("/login", controllers.login);

router.post("/logout", async (req, res) => res.json("logout"));

module.exports = router;
