const db = require("../models")
const { v4: uuidv4 } = require("uuid")

exports.getCart = async (data) => {
    try {
        const cart_session_id = await db.Cart_Session.findOne({
            where: { user_id: data.user_id },
            attributes: ["id"],
            raw: true,
        })

        const query = `select
                        products.id,
                        products.name,
                        products.image,
                        products.price,
                        products.discount,
                        cart_items.quantity,
                        cart_items.cart_session_id
                    from
                        cart_items
                        left join products on products.id = cart_items.product_id
                    where
                        cart_items.cart_session_id = '${cart_session_id.id}';`

        const [response] = await db.sequelize.query(query)

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

exports.order = async (data) => {
    try {
        const uuid = uuidv4() // code for order details

        const [createOrder, created] = await db.Order_Detail.findOrCreate({
            where: { code: uuid },
            defaults: {
                user_id: data[0].user_id,
                status_id: 1, // default 1 - Chờ xác nhận
                total: 0,
                code: uuid,
            },
            raw: true,
        })

        if (!created) {
            return {
                err: 1,
                msg: "Không khởi tạo được đơn hàng. Vui lòng thử lại!",
            }
        }

        // Tạo order_item vào đơn hàng trên
        data.map(async (item) => {
            await db.Order_Item.create({
                order_detail_id: createOrder.dataValues.id,
                product_id: item.product_id,
                quantity: item.quantity,
            })

            // update total payment in order_details
            await db.Order_Detail.update(
                {
                    total: item.totalPayment,
                },
                {
                    where: {
                        id: createOrder.dataValues.id,
                    },
                }
            )

            // Đặt hàng rồi thì vô giỏ hàng xóa nó đi
            await db.Cart_Item.destroy({
                where: {
                    cart_session_id: item.cart_sessions_id,
                    product_id: item.product_id,
                },
            })
        })

        return {
            err: createOrder ? 0 : 1,
            msg: createOrder ? "Cảm ơn quý khách (づ￣ 3￣)づ" : "Đặt hàng thất bại!",
            data: createOrder ? createOrder : null,
        }
    } catch (error) {
        return error
    }
}
