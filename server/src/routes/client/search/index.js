const { recent } = require("../../../controllers/client/search/recent");
const { search } = require("../../../controllers/client/search/search");

const router = require("express").Router();

router.post("/recent", recent);

router.post("/", search)

module.exports = router;
