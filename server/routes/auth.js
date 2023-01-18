import express from "express";

const router = express.Router();

//
router.get("/login", (req, res) => {
  res.json("This is auth login");
});

//
router.get("/register", (req, res) => {
  res.json("This is auth register");
});

//
router.get("/logout", (req, res) => {
  res.json("This is auth logout");
});

export default router;
