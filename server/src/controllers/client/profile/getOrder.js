const { intervalServerError } = require("../../../middleware/handleError");
const { getOrder } = require("../../../services/client/profile/getOrder");

exports.getOrder = async (req, res) => {
  try {
    const response = await getOrder(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
