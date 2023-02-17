const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const adminController = require("../controllers/adminController");

const router = require("express").Router();

// router.use(verifyToken);

// router.use(verifyRole.isAdmin);

router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }));

router.get("/users", adminController.getAllUser)

router.post("/database/newRole", adminController.createNewRole)

router.post("/database/newCategory", adminController.createNewCategory)

module.exports = router;