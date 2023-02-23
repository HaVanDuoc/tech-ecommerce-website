const Joi = require("joi");
const {
  intervalServerError,
  badRequest,
} = require("../middleware/handleError");
const adminService = require("../services/adminService");
const {
  firstName,
  middleName,
  lastName,
  email,
  password,
  phoneNumber,
  address,
  gender,
  role,
} = require("../helper/joiSchema");

const { updateUser } = require("../helper/joiSchema");

const {
  CheckUserNameExists,
  CheckEmailExists,
} = require("../helper/checkExists");

exports.getAllUser = async (req, res) => {
  try {
    const response = await adminService.getAllUser(); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const response = await adminService.getUser(userId);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.createNewUser = async (req, res) => {
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
      role,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await adminService.createNewUser(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { error } = Joi.object({
      firstName: updateUser.firstName,
      middleName: updateUser.middleName,
      lastName: updateUser.lastName,
      userName: updateUser.userName,
      email: updateUser.email,
      password: updateUser.password,
      phoneNumber: updateUser.phoneNumber,
      address: updateUser.address,
      genderCode: updateUser.genderCode,
      roleId: updateUser.roleId,
      statusId: updateUser.statusId,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    // Check Email Exists
    if (req.body.email) {
      const checkEmail = await CheckEmailExists(req.body.email);
      if (checkEmail.err === 1) return res.status(200).json(checkEmail);
    }

    // Check Username Exists
    if (req.body.userName) {
      const checkUserName = await CheckUserNameExists(req.body.userName);
      if (checkUserName.err === 1) return res.status(200).json(checkUserName);
    }

    const userId = req.params.userId;

    const response = await adminService.updateUser(userId, req.body);

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

exports.createNewStatus = async (req, res) => {
  try {
    const name = Joi.string().min(1).required();
    const { error } = Joi.object({ name }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);

    const response = await adminService.createNewStatus(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.getListRole = async (req, res) => {
  try {
    const response = await adminService.getListRole(); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
