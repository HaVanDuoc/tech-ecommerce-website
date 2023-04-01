const { intervalServerError } = require("../../../middleware/handleError");
const { getCart } = require("../../../services/client/cart/getCart");

exports.getCart = async (req, res) => {
  try {
    const response = await getCart(req.body);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
