const Joi = require("joi");

exports.firstName = Joi.string().min(1).max(30).required();

exports.middleName = Joi.string().min(1).max(30).required();

exports.lastName = Joi.string().min(1).max(30).required();

exports.username = Joi.string().alphanum().min(3).max(30).required();

exports.email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

exports.password = Joi.string()
  .min(6)
  .max(30)
  .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  .required();

exports.phoneNumber = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/);

exports.address = Joi.string();

exports.gender = Joi.string();

exports.isAdmin = Joi.boolean();

exports.role = Joi.string();

exports.updateUser = {
  firstName: Joi.string().min(1).max(30),
  middleName: Joi.string().min(1).max(30),
  lastName: Joi.string().min(1).max(30),
  userName: Joi.string().min(1).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
  address: Joi.string(),
  genderCode: Joi.string(),
  roleId: Joi.string(),
  statusId: Joi.string(),
};
