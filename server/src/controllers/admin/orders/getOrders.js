const { intervalServerError } = require("../../../middleware/handleError");
const { getOrders } = require("../../../services/admin/orders/getOrders");

exports.getOrders = async (req, res) => {
  try {
    const pagination = req.body.pagination;

    const response = await getOrders(pagination);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
