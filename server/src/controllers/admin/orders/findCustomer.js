const { intervalServerError } = require("../../../middleware/handleError");
const { findCustomer } = require("../../../services/admin/orders/findCustomer");

exports.findCustomer = async (req, res) => {
  try {
    const key = req.body.key;

    const response = await findCustomer(key);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
