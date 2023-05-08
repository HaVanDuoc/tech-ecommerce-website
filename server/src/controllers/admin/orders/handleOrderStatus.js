const { intervalServerError } = require("../../../middleware/handleError");
const {
  handleOrderStatus,
} = require("../../../services/admin/orders/handleOrderStatus");

exports.handleOrderStatus = async (req, res) => {
  try {
    const actionConfirm = req.body.actionConfirm;
    const actionConfirmed = req.body.actionConfirmed;
    const codeOrder = req.body.codeOrder;

    const response = await handleOrderStatus(
      actionConfirm,
      actionConfirmed,
      codeOrder
    );

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
