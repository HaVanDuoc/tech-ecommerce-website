// userControllers.js
const { intervalServerError } = require("../middleware/handleError");
const { getOneUser } = require("../services/userService");

const getCurrent = async (req, res) => {
  try {
    const { id } = req.user; // req.user get from verifyToken

    const response = await getOneUser(id); // get from userService

    return res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

module.exports = getCurrent;
