const ratingServices = require("../services/ratingServices")

exports.getRatingList = async (req, res) => {
    try {
        const response = await ratingServices.getRatingList()
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
