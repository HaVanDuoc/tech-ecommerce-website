const { intervalServerError } = require("../../../middleware/handleError");
const { homeService } = require("../../../services/client/home");

exports.homeController = async (req, res) => {
  try {
    const response = await homeService();
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
