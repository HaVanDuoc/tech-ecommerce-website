const { intervalServerError } = require("../middleware/handleError")
const productService = require("../services/productService")

exports.getProducts = async (req, res) => {
    try {
        const response = await productService.getProducts(req)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
