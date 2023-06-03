const { intervalServerError } = require("../middleware/handleError")
const brandService = require("../services/brandService")

exports.getBrands = async (req, res) => {
    try {
        const response = await brandService.getBrands(req.body.link)
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
