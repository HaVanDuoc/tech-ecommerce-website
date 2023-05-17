const { intervalServerError } = require("../../../middleware/handleError");
const { getListProducts } = require("../../../services/admin/products/getListProducts");

exports.getListProducts = async (req, res) => {
  try {
    const page = req.body.page;

    const response = await getListProducts(page);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
