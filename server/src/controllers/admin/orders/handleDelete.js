const { intervalServerError } = require("../../../middleware/handleError");
const { handleDelete } = require("../../../services/admin/orders/handleDelete");

exports.handleDelete = async (req, res) => {
  try {
    const order_detail_id = req.body.order_detail_id;
    const order_items_id = req.body.order_items_id;
    const product_id = req.body.product_id;

    const response = await handleDelete(order_detail_id, order_items_id, product_id);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
