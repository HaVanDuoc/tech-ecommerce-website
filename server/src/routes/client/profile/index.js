const {
  destroyOrder,
} = require("../../../controllers/client/profile/destroyOrder");
const { getOrder } = require("../../../controllers/client/profile/getOrder");

const router = require("express").Router();

router.post("/order", getOrder);
router.post("/destroyOrder", destroyOrder);

module.exports = router;
