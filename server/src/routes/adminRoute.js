const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const adminController = require("../controllers/adminController");

const router = require("express").Router();

// router.use(verifyToken);

// router.use(verifyRole.isAdmin);

router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }));

router.get("/users", adminController.getAllUser);

router.get("/user/:userId", adminController.getUser);

router.post("/user/newUser", adminController.createNewUser);

router.put("/user/:userId", adminController.updateUser);

router.post("/database/newCategory", adminController.createNewCategory);

router.post("/database/newStatus", adminController.createNewStatus);

router.get("/roles", adminController.getListRole);

router.post("/database/newRole", adminController.createNewRole);

module.exports = router;
