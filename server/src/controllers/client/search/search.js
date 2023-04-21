const { intervalServerError } = require("../../../middleware/handleError");
const { search } = require("../../../services/client/search/search");

exports.search = async (req, res) => {
  try {
    const response = await search(req.body.user_id);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
