// userControllers.js
const {
  intervalServerError,
  badRequest,
} = require("../middleware/handleError");
const userService = require("../services/userService");
const Joi = require("joi");
const {
  firstName,
  middleName,
  lastName,
  email,
  password,
  phoneNumber,
  address,
  gender,
  isAdmin,
  role_id,
} = require("../helper/joiSchema");

exports.getCurrent = async (req, res) => {
  try {
    const { id } = req.user; // req.user get from verifyToken

    const response = await userService.getOneUser(id); // get from userService

    return res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Create new user
exports.newUser = async (req, res) => {
  try {
    const { error } = Joi.object({
      firstName,
      middleName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      gender,
      isAdmin,
      role_id,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await userService.createNewUser(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
