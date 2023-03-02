// productControllers.js

const Joi = require("joi");
const {
  badRequest,
  intervalServerError,
} = require("../../middleware/handleError");
const { createProduct } = require("../../helper/joiSchema");

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

// Get list Product
exports.getListProduct = async (req, res) => {
  try {
    const response = await adminService.getListProduct();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Get product
exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const response = await adminService.getProduct(productId);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// Update product
exports.updateProduct = async (req, res) => {};

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

// List category
exports.getListCategory = async (req, res) => {
  try {
    const response = await adminService.getListCategory();

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};

// List brand
exports.getListSelectBrand = async (req, res) => {
  try {
    const response = await adminService.getListSelectBrand(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
