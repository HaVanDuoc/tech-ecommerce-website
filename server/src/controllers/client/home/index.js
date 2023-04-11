const { intervalServerError } = require("../../../middleware/handleError");
const { homeService } = require("../../../services/client/home");

exports.homeController = async (req, res) => {
  try {
    const offset = req.body.offset;
    const limit = req.body.limit;

    const response = await homeService(offset, limit);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
