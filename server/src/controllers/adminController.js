const Joi = require("joi");
const {
  intervalServerError,
  badRequest,
} = require("../middleware/handleError");
const adminService = require("../services/adminService");

exports.getAllUser = async (req, res) => {
  try {
    const response = await adminService.getAllUser(); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.createNewRole = async (req, res) => {
  try {
    const name = Joi.string().min(1).required();
    const { error } = Joi.object({ name }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);

    const response = await adminService.createNewRole(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.createNewCategory = async (req, res) => {
  try {
    const name = Joi.string().min(1).required();
    const { error } = Joi.object({ name }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);

    const response = await adminService.createNewCategory(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
