const { intervalServerError } = require("../../../middleware/handleError");
const {
  updateDetails,
} = require("../../../services/admin/products/updateDetails");

exports.updateDetails = async (req, res) => {
  try {
    const response = await updateDetails(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
