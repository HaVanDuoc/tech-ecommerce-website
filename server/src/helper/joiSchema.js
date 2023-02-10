const Joi = require("joi");

exports.username = Joi.string().alphanum().min(3).max(30).required();
exports.password = Joi.string().min(6).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required();
