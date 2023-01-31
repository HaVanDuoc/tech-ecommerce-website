const express = require("express");
const router = express.Router();
const db = require("../db");

// POST - /server/auth/register
router.post("/register", async (req, res) => {
  const query = "SELECT * FROM ecommercetech.category";

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// POST - /server/auth/login
router.post("/login", async (req, res) => res.json("login"));

// POST - /server/auth/logout
router.post("/logout", async (req, res) => res.json("logout"));

module.exports = router;
