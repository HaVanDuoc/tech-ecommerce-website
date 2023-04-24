const { intervalServerError } = require("../../../middleware/handleError");
const { getOrders } = require("../../../services/admin/orders/getOrders");

exports.getOrders = async (req, res) => {
  try {
    const page = req.body.page;

    const response = await getOrders(page);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
