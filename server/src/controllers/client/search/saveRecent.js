const { intervalServerError } = require("../../../middleware/handleError");
const { recent } = require("../../../services/client/search/recent");
const { saveRecent } = require("../../../services/client/search/saveRecent");

exports.saveRecent = async (req, res) => {
  try {
    const product_id = req.body.product_id;
    const user_id = req.body.user_id;

    const response = await saveRecent(product_id, user_id);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
