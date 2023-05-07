const { intervalServerError } = require("../../../middleware/handleError");
const { handleAddProduct } = require("../../../services/admin/orders/handleAddProduct");

exports.handleAddProduct = async (req, res) => {
  try {
    const order_detail_id = req.body.order_detail_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;

    const response = await handleAddProduct(
      order_detail_id,
      product_id,
      quantity
    );

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
