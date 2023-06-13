const Joi = require("joi")
const { intervalServerError } = require("../middleware/handleError")
const productService = require("../services/productService")
const cloudinary = require("cloudinary").v2

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
    const destroyUpload = (images) => {
        images.map((item) => cloudinary.uploader.destroy(item.filename))
    }

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

exports.order = async (req, res) => {
    try {
        const response = await productService.order(req)
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
            name: Joi.string().required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
            category: Joi.string().required(),
            brand: Joi.string().required(),
            discount: Joi.number(),
            image: Joi.string().required(),
        }).validate(req.body)

        if (error) return badRequest(error.details[0]?.message, res)

        const response = await productService.createProduct(req.body)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
