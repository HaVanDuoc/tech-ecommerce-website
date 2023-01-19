import express from "express";

const router = express.Router();

// POST - server/auth/register
router.post("/register", (req, res) => res.json("This is route register"));

// POST - server/auth/login
router.post("/login", (req, res) => res.json("This is route login"));

//
router.get("/logout", (req, res) => {
  res.json("This is auth logout");
});

export default router;
