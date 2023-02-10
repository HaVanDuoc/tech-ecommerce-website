const Joi = require("joi");

exports.email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net"] },
});

exports.username = Joi.string().alphanum().min(3).max(30).required();

exports.password = Joi.string()
  .min(6)
  .max(30)
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required();

exports.firstName = Joi.string().min(1).max(30).required();

exports.lastName = Joi.string().min(1).max(30).required();
