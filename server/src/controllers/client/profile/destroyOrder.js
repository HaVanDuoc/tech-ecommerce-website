const { intervalServerError } = require("../../../middleware/handleError");
const {
  destroyOrder,
} = require("../../../services/client/profile/destroyOrder");

exports.destroyOrder = async (req, res) => {
  try {
    const response = await destroyOrder(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
