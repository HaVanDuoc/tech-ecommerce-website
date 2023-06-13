const Joi = require("joi")

exports.createUser = {
    firstName: Joi.string().min(1).max(30).required(),
    middleName: Joi.string().min(1).max(30),
    lastName: Joi.string().min(1).max(30).required(),
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    password: Joi.string().min(6).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    phoneNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    address: Joi.string(),
    gender: Joi.string(),
    role: Joi.string(),
    birthday: Joi.string(),
}

exports.updateUser = {
    firstName: Joi.string().min(1).max(30),
    middleName: Joi.string().min(1).max(30),
    lastName: Joi.string().min(1).max(30),
    userName: Joi.string().min(1).max(30),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(6).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    phoneNumber: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
    address: Joi.string(),
    dateOfBirth: Joi.string(),
    avatar: Joi.string(),
    genderCode: Joi.string(),
    roleId: Joi.string(),
    statusId: Joi.string(),
}

exports.createProduct = {
    name: Joi.string().min(1).required(),
    price: Joi.number().min(1),
    stock: Joi.number().min(1),
    category: Joi.string().min(1).required(),
    brand: Joi.string().min(1).required(),
    image: Joi.array(),
}
