const { intervalServerError } = require("../middleware/handleError")
const { getBrands } = require("../services/brandService")

exports.getBrands = async (req, res) => {
    try {
        const response = await getBrands(req)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
