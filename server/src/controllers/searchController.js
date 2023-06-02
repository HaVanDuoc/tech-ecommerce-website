const { intervalServerError } = require("../middleware/handleError")
const searchService = require("../services/searchService")

const searchController = {
    header: {
        suggest: null,
        recent: null,
        saveRecent: null,
    },
}

searchController.header.suggest = async (req, res) => {
    try {
        const key = req.body.key
        const limit = req.body.limit
        const response = await searchService.header.suggest(key, limit)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

searchController.header.recent = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const limit = req.body.limit

        const response = await searchService.header.recent(user_id, limit)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

searchController.header.saveRecent = async (req, res) => {
    try {
        const product_id = req.body.product_id
        const user_id = req.body.user_id

        const response = await searchService.header.saveRecent(product_id, user_id)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

module.exports = searchController
