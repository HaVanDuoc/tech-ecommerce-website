// authController.js

const services = require("../services");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({
        err: 1,
        msg: "Vui lòng nhập đầy đủ thông tin!",
      });

    const response = await services.register({username, password});

    return res.status(200).json(response);
    //
  } catch (error) {
    return res.status(500).json({
      err: -1,
      mes: "Internal Server Error",
    });
  }
};

module.exports = { register };
