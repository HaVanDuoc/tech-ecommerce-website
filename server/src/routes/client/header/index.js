const { listNav } = require("../../../controllers/client/header/nav");

const router = require("express").Router();

// Nav
router.get("/nav", listNav);

module.exports = router;
