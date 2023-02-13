const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");
const { getAllUser } = require("../controllers/adminController");

const router = require("express").Router();

router.use(verifyToken);

router.use(verifyRole.isAdmin);

router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }));

router.get("/users", getAllUser)

module.exports = router;
