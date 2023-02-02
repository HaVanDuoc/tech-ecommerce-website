const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

// POST - /api/v1/auth/register
router.post("/register", controllers.register);

// POST - /api/v1/auth/login
router.post("/login", async (req, res) => res.json("login"));

// POST - /api/v1/auth/logout
router.post("/logout", async (req, res) => res.json("logout"));

module.exports = router;
