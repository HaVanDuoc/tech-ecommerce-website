// authController.js

const { intervalServerError } = require("../middleware/handleError");
const services = require("../services");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        err: 1,
        msg: "Vui lòng nhập đầy đủ thông tin!",
      });

    const response = await services.register({ username, password });

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError;
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        err: 1,
        msg: "Vui lòng nhập đầy đủ thông tin!",
      });

    const response = await services.login({ username, password });

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError;
  }
};

module.exports = { register, login };
