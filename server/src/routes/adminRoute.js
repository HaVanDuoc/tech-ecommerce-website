const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");

const router = require("express").Router();

router.use(verifyToken);
router.use(verifyRole.isAdmin);
router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }));

module.exports = router;
