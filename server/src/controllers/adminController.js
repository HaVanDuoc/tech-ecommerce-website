const Joi = require("joi");
const {
  intervalServerError,
  badRequest,
} = require("../middleware/handleError");
const adminService = require("../services/adminService");
const {
  createUser,
  updateUser,
  createProduct,
} = require("../helper/joiSchema");

const {
  CheckUserNameExists,
  CheckEmailExists,
} = require("../helper/checkExists");

// ---------- Find ------------
//#region USER CONTROLLERS
//#region PRODUCT CONTROLLERS
//#region DATABASE CONTROLLERS
// ----------------------------

//#region USER CONTROLLERS

// List users
exports.getAllUser = async (req, res) => {
  try {
    const response = await adminService.getAllUser();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Get a user
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const response = await adminService.getUser(userId);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Create new user
exports.createNewUser = async (req, res) => {
  try {
    const { error } = Joi.object({
      firstName: createUser.firstName,
      middleName: createUser.middleName,
      lastName: createUser.lastName,
      email: createUser.email,
      password: createUser.password,
      phoneNumber: createUser.phoneNumber,
      address: createUser.address,
      gender: createUser.gender,
      role: createUser.role,
      birthday: createUser.birthday,
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
      dateOfBirth: updateUser.dateOfBirth,
      avatar: updateUser.avatar,
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

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const response = await adminService.deleteUser(userId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

//#endregion

//----------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

//#region PRODUCT CONTROLLERS

// List Product
exports.getListProduct = async (req, res) => {
  try {
    const response = await adminService.getListProduct();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const response = await adminService.getProduct(productId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const response = await adminService.deleteProduct(productId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Create new product
exports.createNewProduct = async (req, res) => {
  try {
    const { error } = Joi.object({
      name: createProduct.name,
      image: createProduct.image,
      price: createProduct.price,
      stock: createProduct.stock,
      category: createProduct.category,
      brand: createProduct.brand,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await adminService.createNewProduct(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// List category
exports.getListCategory = async (req, res) => {
  try {
    const response = await adminService.getListCategory();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.getListSelectBrand = async (req, res) => {
  try {
    const response = await adminService.getListSelectBrand(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

//#endregion

//----------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

//#region DATABASE CONTROLLERS

// Create new category
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

// Create new role
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

// Create new status
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

//#endregion

//----------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

exports.getListRole = async (req, res) => {
  try {
    const response = await adminService.getListRole(); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
