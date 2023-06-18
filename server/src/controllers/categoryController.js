const { intervalServerError, badRequest } = require("../middleware/handleError")
const { getCategories, getCategory, updateCategory } = require("../services/categoryService")
const Joi = require("joi")

exports.getCategories = async (req, res) => {
    try {
        const response = await getCategories()
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getCategory = async (req, res) => {
    try {
        const response = await getCategory(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const response = await updateCategory(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
