const { intervalServerError } = require("../../../middleware/handleError");
const { handleDecrease } = require("../../../services/admin/orders/handleDecrease");

exports.handleDecrease = async (req, res) => {
  try {
    const order_items_id = req.body.order_items_id
    
    const response = await handleDecrease(order_items_id);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
