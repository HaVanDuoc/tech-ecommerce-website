const { intervalServerError } = require("../../../middleware/handleError");
const {
  getListProducts,
} = require("../../../services/admin/products/getListProducts");

exports.getListProducts = async (req, res) => {
  try {
    const offset = req.body.offset;

    const response = await getListProducts(offset);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
