const router = require("express").Router();
const navControllers = require("../controllers/client/nav");
const { showBrand } = require("../controllers/client/showBrand");

router.get("/nav", navControllers.getNav);
router.post("/showBrand", showBrand)

module.exports = router;
