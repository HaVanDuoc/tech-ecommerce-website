const { intervalServerError } = require("../../../middleware/handleError");
const {
  getOrderDetails,
} = require("../../../services/admin/orders/getOrderDetails");
const { getOrders } = require("../../../services/admin/orders/getOrders");

exports.getOrderDetails = async (req, res) => {
  try {
    const codeOrder = req.body.codeOrder;

    const response = await getOrderDetails(codeOrder);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
