const express = require("express");
const {
  getCurrentUser,
  register,
  login,
} = require("../../../controllers/client/auth/authControllers");
const { checkCurrentUser } = require("../../../middleware/checkCurrentUser");

const router = express.Router();

router.get("/", checkCurrentUser, getCurrentUser);

router.post("/register", register);

router.post("/login", login);

module.exports = router;