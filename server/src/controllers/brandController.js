const { intervalServerError } = require("../middleware/handleError")
const { getBrands, getBrand, updateBrand } = require("../services/brandService")

exports.getBrands = async (req, res) => {
    try {
        const response = await getBrands(req)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getBrand = async (req, res) => {
    try {
        const response = await getBrand(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.updateBrand = async (req, res) => {
    try {
        const response = await updateBrand(req)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
