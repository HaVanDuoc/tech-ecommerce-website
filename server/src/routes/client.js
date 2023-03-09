const router = require("express").Router();
const navControllers = require("../controllers/client/nav");

router.get("/nav", navControllers.getNav);

module.exports = router;
