const { intervalServerError } = require("../../../middleware/handleError");
const { order } = require("../../../services/client/cart/order");

exports.order = async (req, res) => {
  try {
    const response = await order(req.body);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
