const Joi = require("joi");
const { CheckUserNameExists } = require("../../helper/checkExists");
const { createProduct } = require("../../helper/joiSchema");
const {
  intervalServerError,
  badRequest,
} = require("../../middleware/handleError");
const displayServices = require("../../services/adminServices/display");

// exports.listCategories = async (req, res) => {
//   try {
//     const response = await displayServices.listCategories();

//     res.status(200).json(response);
//   } catch (error) {
//     return intervalServerError(res);
//   }
// };

// Create new product
exports.createNewCategory = async (req, res) => {
  try {
    name = Joi.string().min(1).required();
    link = Joi.string().min(1).required();
    image = Joi.string().min(1).required();

    const { error } = Joi.object({
      name,
      image,
      link,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await displayServices.createNewCategory(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// // Create new product
exports.getCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const response = await displayServices.getCategory(categoryId); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    name = Joi.string();
    link = Joi.string();
    image = Joi.string();
    brands = Joi.array();

    const { error } = Joi.object({
      name,
      link,
      image,
      brands,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const categoryId = req.params.categoryId;

    const data = {
      name: req.body.name,
      link: req.body.link,
      illustration: req.body.image,
      brands: req.body.brands,
    };

    const response = await displayServices.updateCategory(categoryId, data);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Create new product
exports.createNewBrand = async (req, res) => {
  try {
    name = Joi.string().min(1).required();
    link = Joi.string().min(1);
    logo = Joi.string().min(1);

    const { error } = Joi.object({
      name,
      logo,
      link,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await displayServices.createNewBrand(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// exports.listBrand = async (req, res) => {
//   try {
//     const response = await displayServices.listBrand();

//     res.status(200).json(response);
//   } catch (error) {
//     return intervalServerError(res);
//   }
// };

exports.setBrandForCategories = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const response = await displayServices.setBrandForCategories(
      categoryId,
      req.body
    );

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

exports.selectedBrands = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const response = await displayServices.selectedBrands(categoryId);
    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// exports.getBrand = async (req, res) => {
//   try {
//     const brandId = req.params.brandId;
//     const response = await displayServices.getBrand(brandId);
//     res.status(200).json(response);
//   } catch (error) {
//     return intervalServerError(res);
//   }
// };

// exports.updateBrand = async (req, res) => {
//   try {
//     name = Joi.string();
//     link = Joi.string();
//     logo = Joi.string();

//     const { error } = Joi.object({ name, link, logo }).validate(req.body);
//     if (error) return badRequest(error.details[0].message, res);

//     const brandId = req.params.brandId;
//     const response = await displayServices.updateBrand(brandId, req.body);

//     return res.status(200).json(response);
//   } catch (error) {
//     return intervalServerError(res);
//   }
// };
