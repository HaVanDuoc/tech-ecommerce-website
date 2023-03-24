const { intervalServerError } = require("../../../middleware/handleError");
const {
  updateView,
} = require("../../../services/client/categories/updateView");

exports.updateView = async (req, res) => {
  try {
    const response = await updateView(req.body.id);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
