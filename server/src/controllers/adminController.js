const { intervalServerError } = require("../middleware/handleError");
const { getAllUser } = require("../services/adminService");

exports.getAllUser = async (req, res) => {
  try {
    const response = await getAllUser(); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
