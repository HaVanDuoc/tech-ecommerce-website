// authController.js

const {
  intervalServerError,
  badRequest,
} = require("../middleware/handleError");
const services = require("../services");
const Joi = require("joi");
const { username, password } = require("../helper/joiSchema");

exports.register = async (req, res) => {
  try {
    const { error } = Joi.object({ username, password }).validate(req.body);
    if (error) return badRequest(res, error.details[0]?.message);

    const response = await services.register(req.body);

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = Joi.object({ username, password }).validate(req.body);
    if (error) return badRequest(res, error.details[0]?.message);

    const response = await services.login(req.body);

    return res.status(200).json(response);
    //
  } catch (error) {
    return intervalServerError(res);
  }
};
