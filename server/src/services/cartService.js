const db = require("../models")

exports.getCart = async (req) => {
    try {
        const user_id = req.user.id

        const cart_session_id = await db.cart_sessions.findOne({
            where: { user_id },
            attributes: ["id"],
            raw: true,
        })

        const query = `select
                        products.id,
                        products.name,
                        products.files,
                        products.price,
                        products.discount,
                        cart_items.quantity,
                        cart_items.pay
                    from
                        cart_items
                        left join products on products.id = cart_items.product_id
                    where
                        cart_items.cart_session_id = '${cart_session_id.id}';`

        const [products] = await db.sequelize.query(query)

        var response = new Object()
        response["cart_session_id"] = cart_session_id.id
        response["products"] = products

        return {
            err: response ? 0 : 1,
            msg: response ? "Update data successfully" : "Update data failed",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.increaseQuantity = async (data) => {
    try {
        const getCurrentQuantity = await db.cart_items.findOne({
            where: {
                product_id: data.product_id,
                cart_session_id: data.cart_session_id,
            },
            attributes: ["quantity"],
            raw: true,
        })

        const response = await db.cart_items.update(
            { quantity: Number(getCurrentQuantity.quantity) + 1 },
            {
                where: {
                    product_id: data.product_id,
                    cart_session_id: data.cart_session_id,
                },
            }
        )

        return {
            err: response ? 0 : 1,
            msg: response ? "Update data successfully" : "Update data failed",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.decreaseQuantity = async (data) => {
    try {
        const getCurrentQuantity = await db.cart_items.findOne({
            where: {
                product_id: data.product_id,
                cart_session_id: data.cart_session_id,
            },
            attributes: ["quantity"],
            raw: true,
        })

        const response = await db.cart_items.update(
            { quantity: Number(getCurrentQuantity.quantity) - 1 },
            {
                where: {
                    product_id: data.product_id,
                    cart_session_id: data.cart_session_id,
                },
            }
        )

        return {
            err: response ? 0 : 1,
            msg: response ? "Update data successfully" : "Update data failed",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.deleteCartItem = async (data) => {
    try {
        const response = await db.cart_items.destroy({
            where: {
                product_id: data.product_id,
                cart_session_id: data.cart_session_id,
            },
        })

        return {
            err: response ? 0 : 1,
            msg: response ? "Delete data successfully" : "Delete data failed",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.counterProducts = async (req) => {
    try {
        const user_id = req?.user?.id

        if (!user_id)
            return {
                err: 1,
                msg: "Failure",
            }

        const query = `select
                            count(*) as counter
                        from
                            cart_items
                            left join cart_sessions on cart_sessions.id = cart_items.cart_session_id
                        where
                            user_id = ${user_id};`

        const [response] = await db.sequelize.query(query)

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response ? response[0].counter : null,
        }
    } catch (error) {
        return error
    }
}
