const { intervalServerError } = require("../../../middleware/handleError");
const { handleIncrease } = require("../../../services/admin/orders/handleIncrease");

exports.handleIncrease = async (req, res) => {
  try {
    const order_items_id = req.body.order_items_id
    
    const response = await handleIncrease(order_items_id);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
