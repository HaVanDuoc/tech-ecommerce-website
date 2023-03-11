const {
  getListProduct,
} = require("../controllers/sectionProduct/getListProduct");

const router = require("express").Router();

router.post("/getListProduct/:page", getListProduct);

module.exports = router;
