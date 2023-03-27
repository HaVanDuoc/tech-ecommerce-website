//
// Create new product controller
//
const Joi = require("joi");
const {
  badRequest,
  intervalServerError,
} = require("../../../middleware/handleError");
const {
  createNewProduct,
} = require("../../../services/admin/products/createNewProduct");

exports.createNewProduct = async (req, res) => {
  try {
    const { error } = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      category: Joi.string().required(),
      brand: Joi.string().required(),
      discount: Joi.number(),
      image: Joi.string().required(),
    }).validate(req.body);

    if (error) return badRequest(error.details[0]?.message, res);

    const response = await createNewProduct(req.body);

    res.status(200).json(response);
  } catch (error) {
    return intervalServerError(res);
  }
};
