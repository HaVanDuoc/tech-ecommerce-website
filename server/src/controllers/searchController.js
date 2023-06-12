const { intervalServerError } = require("../middleware/handleError")
const { headerSuggest, headerRecent, headerSaveRecent } = require("../services/searchService")

exports.headerSuggest = async (req, res) => {
    try {
        const key = req.body.key
        const limit = req.body.limit
        const response = await headerSuggest(key, limit)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.headerRecent = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const limit = req.body.limit

        const response = await headerRecent(req, user_id, limit)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.headerSaveRecent = async (req, res) => {
    try {
        const product_id = req.body.product_id
        const user_id = req.body.user_id

        const response = await headerSaveRecent(product_id, user_id)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
