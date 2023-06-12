const { intervalServerError } = require("../middleware/handleError")
const { getOrder, getTabs, destroyOrder } = require("../services/orderService")

exports.getOrder = async (req, res) => {
    try {
        const response = await getOrder(req)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.getTabs = async (req, res) => {
    try {
        const response = await getTabs()

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.destroyOrder = async (req, res) => {
    try {
        const response = await destroyOrder(req.body)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
