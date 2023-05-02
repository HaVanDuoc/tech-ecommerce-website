const { recent } = require("../../../controllers/client/search/recent");
const { saveRecent } = require("../../../controllers/client/search/saveRecent");
const { suggest } = require("../../../controllers/client/search/suggest");

const router = require("express").Router();

router.post("/suggest", suggest);

router.post("/recent", recent);

router.post("/saveRecent", saveRecent);

module.exports = router;
