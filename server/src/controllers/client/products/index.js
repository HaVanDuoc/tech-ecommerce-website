const { intervalServerError } = require("../../../middleware/handleError");
const { productsService } = require("../../../services/client/products");

exports.productsController = async (req, res) => {
  try {
    const category = req.body.category;
    const page = req.body.page;
    const brandParams = req.body.brandParams;

    const response = await productsService(category, page, brandParams);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
