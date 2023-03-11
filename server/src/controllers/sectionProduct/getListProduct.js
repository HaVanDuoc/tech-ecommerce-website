const { intervalServerError } = require("../../middleware/handleError");
const {
  getListProduct,
} = require("../../services/sectionProduct/getListProduct");

exports.getListProduct = async (req, res) => {
  try {
    const page = req.params.page;
    const data = {};

    switch (page) {
      case "dien-thoai":
        data.category = "Điện thoại";
        break;

      case "tablet":
        data.category = "Tablet";
        break;

      case "laptop":
        data.category = "Laptop";
        break;

      default:
        break;
    }

    const response = await getListProduct(data);

    return res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
