const Joi = require("joi");

const username = Joi.string().alphanum().min(3).max(30).required();
const password = Joi.string().min(6).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required();

module.exports = { username, password };
