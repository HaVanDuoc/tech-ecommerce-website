const { intervalServerError } = require("../../../middleware/handleError");
const { createOrder } = require("../../../services/admin/orders/createOrder");

exports.createOrder = async (req, res) => {
  try {
    const orders = req.body.orders;
    const user_id = req.body.user_id;
    const payment = req.body.payment;

    const response = await createOrder(orders, user_id, payment);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
