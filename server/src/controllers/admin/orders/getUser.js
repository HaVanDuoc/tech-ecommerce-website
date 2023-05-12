const { intervalServerError } = require("../../../middleware/handleError");
const { getUser } = require("../../../services/admin/orders/getUser");

exports.getUser = async (req, res) => {
  try {
    const user_id = req.body.user_id;

    const response = await getUser(user_id);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
