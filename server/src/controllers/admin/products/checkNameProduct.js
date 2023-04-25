const { intervalServerError } = require("../../../middleware/handleError");
const {
  checkNameProduct,
} = require("../../../services/admin/products/checkNameProduct");

exports.checkNameProduct = async (req, res) => {
  try {
    const key = req.body.key;

    const response = await checkNameProduct(key);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
