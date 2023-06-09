const db = require("../models")

exports.getCart = async (req) => {
    try {
        const user_id = req.user.id

        const cart_session_id = await db.Cart_Session.findOne({
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
        const getCurrentQuantity = await db.Cart_Item.findOne({
            where: {
                product_id: data.product_id,
                cart_session_id: data.cart_session_id,
            },
            attributes: ["quantity"],
            raw: true,
        })

        const response = await db.Cart_Item.update(
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
        const getCurrentQuantity = await db.Cart_Item.findOne({
            where: {
                product_id: data.product_id,
                cart_session_id: data.cart_session_id,
            },
            attributes: ["quantity"],
            raw: true,
        })

        const response = await db.Cart_Item.update(
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
        const response = await db.Cart_Item.destroy({
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
