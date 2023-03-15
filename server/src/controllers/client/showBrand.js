const { intervalServerError } = require("../../middleware/handleError");
const db = require("../../models");
const { showBrand } = require("../../services/client/showBrand");

exports.showBrand = async (req, res) => {
  try {
    const response = await showBrand(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
