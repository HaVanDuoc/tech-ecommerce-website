const { intervalServerError } = require("../../../middleware/handleError");
const { productsService } = require("../../../services/client/products");

exports.productsController = async (req, res) => {
  try {
    const category = req.body.category;
    const pagination = req.body.pagination;

    const response = await productsService(category, pagination);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
