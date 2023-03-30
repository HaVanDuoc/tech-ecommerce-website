const { homeController } = require("../../../controllers/client/home");

const router = require("express").Router();

router.get("/", homeController);

module.exports = router;
