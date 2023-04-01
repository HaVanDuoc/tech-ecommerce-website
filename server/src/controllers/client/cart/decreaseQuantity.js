const { intervalServerError } = require("../../../middleware/handleError");
const {
  decreaseQuantity,
} = require("../../../services/client/cart/decreaseQuantity");

exports.decreaseQuantity = async (req, res) => {
  try {
    const response = await decreaseQuantity(req.body);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
