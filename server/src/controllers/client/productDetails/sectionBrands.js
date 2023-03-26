const { intervalServerError } = require("../../../middleware/handleError");
const {
  sectionBrands,
} = require("../../../services/client/productDetails/sectionBrands");

exports.sectionBrands = async (req, res) => {
  try {
    const response = await sectionBrands(req.body.category);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
