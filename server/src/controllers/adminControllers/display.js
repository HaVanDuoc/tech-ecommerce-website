const Joi = require("joi");
const { CheckUserNameExists } = require("../../helper/checkExists");
const { createProduct } = require("../../helper/joiSchema");
const {
  intervalServerError,
  badRequest,
} = require("../../middleware/handleError");
const displayServices = require("../../services/adminServices/display");

exports.listCategories = async (req, res) => {
  try {
    const response = await displayServices.listCategories();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

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

// Create new product
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

    const { error } = Joi.object({
      name,
      link,
      image,
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const categoryId = req.params.categoryId;

    const data = {
      name: req.body.name,
      link: req.body.link,
      illustration: req.body.image,
    };

    console.log("data", data);

    const response = await displayServices.updateCategory(categoryId, data);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
