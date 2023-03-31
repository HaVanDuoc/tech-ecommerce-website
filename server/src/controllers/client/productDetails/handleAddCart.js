const { intervalServerError } = require("../../../middleware/handleError");
const {
  handleAddCart,
} = require("../../../services/client/productDetails/handleAddCart");

exports.handleAddCart = async (req, res) => {
  try {
    const response = await handleAddCart(req.body.user_id, req.body.product_id);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
