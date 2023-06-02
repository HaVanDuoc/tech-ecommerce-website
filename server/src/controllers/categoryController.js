const { intervalServerError } = require("../middleware/handleError")
const categoryService = require("../services/categoryService")

exports.getCategories = async (req, res) => {
    try {
        const response = await categoryService.getCategories()
        return res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
