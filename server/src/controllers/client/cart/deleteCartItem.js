const { intervalServerError } = require("../../../middleware/handleError");
const {
  deleteCartItem,
} = require("../../../services/client/cart/deleteCartItem");

exports.deleteCartItem = async (req, res) => {
  try {
    const response = await deleteCartItem(req.body);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
