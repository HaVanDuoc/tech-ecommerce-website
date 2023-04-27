const { intervalServerError } = require("../../../middleware/handleError");
const { setView } = require("../../../services/client/products/setView");

exports.setView = async (req, res) => {
  try {
    const brand = req.body.brand;

    const response = await setView(brand);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
