const { intervalServerError } = require("../middleware/handleError")
const {
    getCart,
    increaseQuantity,
    decreaseQuantity,
    deleteCartItem,
    counterProducts,
} = require("../services/cartService")

exports.getCart = async (req, res) => {
    try {
        const response = await getCart(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.increaseQuantity = async (req, res) => {
    try {
        const response = await increaseQuantity(req.body)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.decreaseQuantity = async (req, res) => {
    try {
        const response = await decreaseQuantity(req.body)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.deleteCartItem = async (req, res) => {
    try {
        const response = await deleteCartItem(req.body)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.counterProducts = async (req, res) => {
    try {
        const response = await counterProducts(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
