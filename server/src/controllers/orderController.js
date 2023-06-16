const { intervalServerError } = require("../middleware/handleError")
const {
    getOrder,
    getTabs,
    destroyOrder,
    getOrderDetails,
    createOrder,
    handleOrderStatus,
    handleIncrease,
    handleDecrease,
    handleAddProduct,
    handleDelete,
    createOrderAdmin,
} = require("../services/orderService")

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

exports.getOrderDetails = async (req, res) => {
    try {
        const response = await getOrderDetails(req)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.createOrder = async (req, res) => {
    try {
        const response = await createOrder(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.createOrderAdmin = async (req, res) => {
    try {
        const response = await createOrderAdmin(req)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.handleOrderStatus = async (req, res) => {
    try {
        const actionConfirm = req.body.actionConfirm
        const actionConfirmed = req.body.actionConfirmed
        const codeOrder = req.body.codeOrder

        const response = await handleOrderStatus(actionConfirm, actionConfirmed, codeOrder)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.handleIncrease = async (req, res) => {
    try {
        const order_items_id = req.body.order_items_id

        const response = await handleIncrease(order_items_id)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.handleDecrease = async (req, res) => {
    try {
        const order_items_id = req.body.order_items_id

        const response = await handleDecrease(order_items_id)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.handleAddProduct = async (req, res) => {
    try {
        const order_detail_id = req.body.order_detail_id
        const product_id = req.body.product_id
        const quantity = req.body.quantity

        const response = await handleAddProduct(order_detail_id, product_id, quantity)

        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}

exports.handleDelete = async (req, res) => {
    try {
        const order_detail_id = req.body.order_detail_id
        const order_items_id = req.body.order_items_id
        const product_id = req.body.product_id

        const response = await handleDelete(order_detail_id, order_items_id, product_id)
        res.status(200).json(response)
    } catch (error) {
        return intervalServerError(res)
    }
}
