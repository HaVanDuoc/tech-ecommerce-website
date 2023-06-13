// userControllers.js

const Joi = require("joi")
const { badRequest, intervalServerError } = require("../../middleware/handleError")
const { CheckUserNameExists, CheckEmailExists } = require("../../helper/checkExists")
const { createUser, updateUser } = require("../../helper/joiSchema")
const userServices = require("../../services/adminServices/userServices")

// Get list roles
exports.getListRole = async (req, res) => {
    try {
        const response = await userServices.getListRole() // service

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
