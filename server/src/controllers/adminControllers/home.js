const { intervalServerError } = require("../../middleware/handleError")
const { getRevenue } = require("../../services/adminServices/home")

exports.getRevenue = async (req, res) => {
    try {
        const response = await getRevenue(req) // service
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
