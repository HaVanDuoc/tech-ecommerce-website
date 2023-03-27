// productControllers.js

const Joi = require("joi");
const {
  badRequest,
  intervalServerError,
} = require("../../middleware/handleError");
const { createProduct } = require("../../helper/joiSchema");
const productServices = require("../../services/adminServices/productServices");
const { CheckUserNameExists } = require("../../helper/checkExists");

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
      discount: Joi.number(),
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await productServices.createNewProduct(req.body); // service

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Get list Product
exports.getListProduct = async (req, res) => {
  try {
    const response = await productServices.getListProduct();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Get product
exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const response = await productServices.getProduct(productId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { error } = Joi.object({
      name: Joi.string(),
      price: Joi.number(),
      stock: Joi.number(),
      discount: Joi.number(),
      isActive: Joi.string(),
      category: Joi.string(),
      brand: Joi.string(),
      images: Joi.array(),
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const productId = req.params.productId;

    const response = await productServices.updateProduct(productId, req.body);

    return res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const response = await productServices.deleteProduct(productId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// List category
exports.getListCategory = async (req, res) => {
  try {
    const response = await productServices.getListCategory();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// List brand
exports.getListSelectBrand = async (req, res) => {
  try {
    const response = await productServices.getListSelectBrand(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// List brand
exports.getImageList = async (req, res) => {
  try {
    const productId = req.params.productId;
    const response = await productServices.getImageList(productId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// List brand
exports.updateImageList = async (req, res) => {
  try {
    const productId = req.params.productId;
    const response = await productServices.updateImageList(req.body, productId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
