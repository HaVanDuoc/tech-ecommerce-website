const { intervalServerError } = require("../../../middleware/handleError");
const { increaseQuantity } = require("../../../services/client/cart/increaseQuantity");

exports.increaseQuantity = async (req, res) => {
  try {
    const response = await increaseQuantity(req.body);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
