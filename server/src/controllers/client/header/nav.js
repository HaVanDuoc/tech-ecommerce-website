const { intervalServerError } = require("../../../middleware/handleError");
const { listNav } = require("../../../services/client/header/nav");

exports.listNav = async (req, res) => {
  try {
    const response = await listNav();
    console.log('response', response)
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
