const { intervalServerError } = require("../../../middleware/handleError");
const {
  getProduct,
} = require("../../../services/client/pageProduct/getProduct");

exports.getProduct = async (req, res) => {
  try {
    const { nameProduct } = req.body;

    const response = await getProduct(nameProduct);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
