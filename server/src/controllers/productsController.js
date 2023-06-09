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
