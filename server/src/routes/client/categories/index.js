const {
  updateView,
} = require("../../../controllers/client/categories/updateView");

const router = require("express").Router();

router.get("/")
router.put("/view", updateView);

module.exports = router;
