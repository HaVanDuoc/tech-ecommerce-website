const { intervalServerError } = require("../../../middleware/handleError");
const {
  handleOrderStatus,
} = require("../../../services/admin/orders/handleOrderStatus");

exports.handleOrderStatus = async (req, res) => {
  try {
    const order_id = req.body.order_id;
    const order_totalPayment = req.body.order_totalPayment;
    const confirm = req.body.confirm;
    const user_id = req.body.user_id;

    const response = await handleOrderStatus(
      order_id,
      order_totalPayment,
      confirm,
      user_id
    );

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
