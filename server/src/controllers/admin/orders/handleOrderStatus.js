const { intervalServerError } = require("../../../middleware/handleError");
const { handleOrderStatus } = require("../../../services/admin/orders/handleOrderStatus");

exports.handleOrderStatus = async (req, res) => {
  try {
    const order_id = req.body.order_id;
    const order_status = req.body.order_status;

    const response = await handleOrderStatus(order_id, order_status);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
