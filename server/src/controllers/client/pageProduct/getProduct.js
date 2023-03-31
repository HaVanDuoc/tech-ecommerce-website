const { intervalServerError } = require("../../../middleware/handleError");
const {
  getProduct,
} = require("../../../services/client/pageProduct/getProduct");

exports.getProduct = async (req, res) => {
  try {
    const response = await getProduct(req.body.nameProduct, req.body.user_id);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
