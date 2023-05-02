const { intervalServerError } = require("../../../middleware/handleError");
const { suggest } = require("../../../services/client/search/suggest");

exports.suggest = async (req, res) => {
  try {
    const key = req.body.key;
    const limit = req.body.limit;

    const response = await suggest(key, limit);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
