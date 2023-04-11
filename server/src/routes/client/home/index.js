const { homeController } = require("../../../controllers/client/home");

const router = require("express").Router();

router.post("/", homeController);

module.exports = router;
