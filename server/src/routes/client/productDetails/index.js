const { sectionBrands } = require("../../../controllers/client/productDetails/sectionBrands");
const { sectionCategories } = require("../../../controllers/client/productDetails/sectionCategories");

const router = require("express").Router();

router.get("/sectionCategories", sectionCategories);
router.post("/sectionBrands", sectionBrands);

module.exports = router;