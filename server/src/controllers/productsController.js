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
    try {
        const productId = req.body.productId

        const files = req.files
        const deleted = req.body.deleted && JSON.parse(req.body.deleted)

        const destroyUpload = (images) => {
            images.map((item) => cloudinary.uploader.destroy(item.filename))
        }

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
