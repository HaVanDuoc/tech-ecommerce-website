const { intervalServerError } = require("../../../middleware/handleError");
const {
  sectionCategories,
} = require("../../../services/client/productDetails/sectionCategories");

exports.sectionCategories = async (req, res) => {
  try {
    const response = await sectionCategories();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
