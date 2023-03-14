const { intervalServerError } = require("../../middleware/handleError")
const { listBrand } = require("../../services/adminServices/admin")

exports.listBrand = async (req,res) => {
    try {
        const response = await listBrand()

        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}