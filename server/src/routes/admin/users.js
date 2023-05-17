const {
  getAllUser,
  createNewUser,
  deleteUser,
  updateUser,
} = require("../../controllers/adminControllers/userControllers");
const verifyToken = require("../../middleware/verifyToken");
const verifyRole = require("../../middleware/verifyRole");

const router = require("express").Router();

router.get("/", getAllUser); // List users

router.use(verifyToken);
router.use(verifyRole);

router.put("/:userId", updateUser); // Update a user
router.post("/newUser", createNewUser); // Create new user
router.delete("/:userId", deleteUser); // Delete a user

module.exports = router;
