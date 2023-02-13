// authController.js

const {
  intervalServerError,
  badRequest,
} = require("../middleware/handleError");
const services = require("../services");
const Joi = require("joi");
const {
  email,
  password,
  firstName,
  lastName,
  role_code,
} = require("../helper/joiSchema");

exports.register = async (req, res) => {
  try {
    const { error } = Joi.object({
      email,
      password,
      firstName,
      lastName,
      role_code,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await services.register(req.body);

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = Joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);

    const response = await services.login(req.body);

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};
