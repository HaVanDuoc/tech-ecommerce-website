const navServices = require("../../services/client/nav");
const { intervalServerError } = require("../../middleware/handleError");

exports.getNav = async (req, res) => {
  try {
    const response = await navServices.getNav();
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
