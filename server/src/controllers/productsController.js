const Joi = require("joi")
const { intervalServerError } = require("../middleware/handleError")
const productService = require("../services/productService")
const destroyUpload = require("../utils/destroyUpload")

exports.getProducts = async (req, res) => {
    try {
        const response = await productService.getProducts(req)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getProduct = async (req, res) => {
    try {
        const response = await productService.getProduct(req)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.updateImage = async (req, res) => {
    try {
        const productId = req.body.productId

        const files = req.files
        const deleted = req.body.deleted && JSON.parse(req.body.deleted)

        if (deleted) destroyUpload(deleted)

        const response = await productService.updateImage(productId, files, deleted)

        // if update fail, delete images on the cloud
        if (files && response.err === 1) destroyUpload(response.latest)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.updateInfo = async (req, res) => {
    try {
        const response = await productService.updateInfo(req.body)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getProductsAdmin = async (req, res) => {
    try {
        const page = req.body.page

        const response = await productService.getProductsAdmin(page)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.addCart = async (req, res) => {
    try {
        const response = await productService.addCart(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.updateView = async (req, res) => {
    try {
        const response = await productService.updateView(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { error } = Joi.object({
            name: Joi.string(),
            price: Joi.number(),
            stock: Joi.number(),
            category: Joi.string(),
            brand: Joi.string(),
            discount: Joi.number(),
            // image: Joi.string(),
        }).validate(req.body)

        if (error) return badRequest(error.details[0]?.message, res)

        const response = await productService.createProduct(req)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.checkNameProduct = async (req, res) => {
    try {
        const key = req.body.key

        const response = await productService.checkNameProduct(key)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.searchProduct = async (req, res) => {
    try {
        const response = await productService.searchProduct(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
