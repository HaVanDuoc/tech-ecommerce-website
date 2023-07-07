const db = require("../models")
const { v4: uuidv4 } = require("uuid")
const { getOffset, calculatePayment } = require("../utils/calculator")

exports.getOrder = async (req) => {
    try {
        const user_id = req.body.user_id
        const type = req.body.type === "Tất cả" ? null : req.body.type
        const page = req.body.page || 1
        const limit = 10
        const offset = getOffset(page, limit)

        var response = new Object()

        const getAmountProducts = async () => {
            const [[amount]] = await db.sequelize.query(`
                select
                    count(*) as amount_order
                from
                    order_details
                    left join order_statuses on order_statuses.id = order_details.status_id
                where
                    order_details.id > -1
                    ${user_id ? 'and order_details.user_id = "' + user_id + '"' : ""}
                    ${type ? 'and order_statuses.status = "' + type + '"' : ""};
            `)

            return amount.amount_order
        }

        const amountProducts = await getAmountProducts()

        response["sumProducts"] = amountProducts
        response["sumPages"] = Math.ceil(amountProducts / limit)
        response["payload"] = []

        let [orderList] = await db.sequelize.query(`
            select
                order_details.id,
                order_details.code,
                order_details.total,
                order_statuses.status,
                order_details.createdAt,
                order_details.updatedAt
            from
                order_details
                left join order_statuses on order_statuses.id = order_details.status_id
            where
                order_details.id > -1
                ${user_id ? 'and order_details.user_id = "' + user_id + '"' : ""}
                ${type ? 'and order_statuses.status = "' + type + '"' : ""}
            order by
                order_details.createdAt desc
            limit
                ${limit}
            offset
                ${offset};
        `)

        await Promise.all(
            orderList.map(async (item) => {
                const [orderItem] = await db.sequelize.query(`
                  select
                      order_items.id,
                      order_items.quantity,
                      order_items.product_id,
                      products.productId,
                      products.name as 'name_product',
                      products.files,
                      products.price,
                      products.discount,
                      order_items.createdAt
                  from
                      order_items
                      left join products on products.id = order_items.product_id
                  where
                      order_items.order_detail_id = ${item.id};
                `)

                item.orderItem = orderItem

                response.payload.push(item)
            })
        )

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failure",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.getTabs = async () => {
    try {
        let response = []

        response.push({ id: 0, status: "Tất cả" })

        const [tabs] = await db.sequelize.query(`select id, status from order_statuses`)

        tabs.map((item) => {
            response.push(item)
        })

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failure",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.destroyOrder = async (data) => {
    try {
        // check current status
        const query = `select
                            order_statuses.status
                        from
                            order_details
                            left join order_statuses on order_statuses.id = order_details.status_id
                        where
                            order_details.id = "${data.order_details_id}"`

        const [response] = await db.sequelize.query(query)

        // Chỉ có `Chờ xác nhận mới được phép hủy

        // Nếu response đang là hủy thì chuyển thành Chờ xác nhận
        if (response[0].status === "Đã hủy") {
            await db.order_details.update({ status_id: 1 }, { where: { id: data.order_details_id } })

            return {
                err: 0,
                msg: "Đã đặt mua lại đơn hàng!",
            }
        }

        // Ngược lại Chờ xác nhận thì chuyển thành Hủy
        if (response[0].status === "Chờ xác nhận") {
            await db.order_details.update({ status_id: 5 }, { where: { id: data.order_details_id } })
            return {
                err: 0,
                msg: "Đã hủy đơn hàng!",
            }
        }
    } catch (error) {
        return error
    }
}

exports.getOrderDetails = async (req) => {
    try {
        const codeOrder = req.body.codeOrder
        var response = []

        const [detail] = await db.sequelize.query(`
          select
              table_orders.id as 'order_id',
              table_orders.code as 'order_code',
              table_orders.total,
              table_orders.order_status,
              table_orders.order_status_id,
              table_orders.user_id,
              table_users.userId,
              table_users.avatar,
              table_users.firstName,
              table_users.middleName,
              table_users.lastName,
              table_users.email,
              table_users.phoneNumber,
              table_users.address,
              table_users.dateOfBirth,
              table_users.gender,
              table_orders.createdAt
          from
              (
                  SELECT
                      order_details.id,
                      order_details.code,
                      order_details.user_id as 'user_id',
                      order_details.total,
                      order_details.status_id as 'order_status_id',
                      order_statuses.status as 'order_status',
                      order_details.createdAt
                  FROM
                      order_details
                      left join order_statuses on order_statuses.id = order_details.status_id
                  where
                      code = '${codeOrder}'
              ) as table_orders
              left join (
                  SELECT
                      users.id,
                      users.userId,
                      users.avatar,
                      users.firstName,
                      users.middleName,
                      users.lastName,
                      users.dateOfBirth,
                      genders.name as 'gender',
                      users.email,
                      users.phoneNumber,
                      users.address
                  FROM
                      users
                      left join genders on genders.code = users.genderCode
              ) as table_users on table_orders.user_id = table_users.id;
      `)

        response = { ...detail[0] }

        // Get list order in orders
        const [orderList] = await db.sequelize.query(`
          select
              order_items.id as 'order_items_id',
              order_items.order_detail_id,
              table_2.id as 'product_id',
              table_2.name as 'name_product',
              order_items.quantity,
              order_items.createdAt as 'createdAt_order',
              table_2.price,
              table_2.discount,
              table_2.category,
              table_2.files
          from
              order_items
              left join (
                  select
                      products.id,
                      products.name,
                      products.files,
                      products.price,
                      products.discount,
                      categories.name as 'category'
                  from
                      products
                      left join categories on categories.categoryId = products.categoryId
              ) table_2 on table_2.id = order_items.product_id
          where
              order_detail_id = ${detail[0].order_id};
      `)

        response["order_list"] = orderList

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}

exports.createOrder = async (req) => {
    try {
        const uuid = uuidv4() // code for order details
        const user_id = req.body.user_id
        const orders = req.body.orders
        const status_id = req.body.status_id

        if (!user_id || !orders) return { err: 1, msg: "Lỗi!" }

        // First, create order
        const [createOrder, created] = await db.order_details.findOrCreate({
            where: { code: uuid },
            defaults: {
                user_id,
                status_id: status_id || 1, // 1 - Chờ xác nhận
                total: 0,
                code: uuid,
            },
            raw: true,
        })

        if (!created) return { err: 1, msg: "Không khởi tạo được đơn hàng. Vui lòng thử lại!" }

        // Tạo order_item vào đơn hàng trên
        orders.map(async (item) => {
            const product = await db.products.findOne({
                where: { id: item.product_id },
                attributes: ["id", "price", "discount"],
                raw: true,
            })

            // create order item of order
            await db.order_items.create({
                order_detail_id: createOrder.dataValues.id,
                product_id: item.product_id,
                quantity: item.quantity,
                pay: calculatePayment(product.price, item.quantity, product.discount),
            })

            const pay = calculatePayment(product.price, item.quantity, product.discount)

            // Update total plus in order_details
            const [updateTotal] = await db.sequelize.query(`
                update order_details set total = total + ${Number(pay) || 0} where id = ${createOrder.dataValues.id};
            `)

            // Đặt hàng rồi thì vô giỏ hàng xóa nó đi
            const [[user]] = await db.sequelize.query(`
                    select
                        users.id,
                        cart_sessions.id as 'cart_sessions_id'
                    from
                        users
                        left join cart_sessions on cart_sessions.user_id = users.id
                    where
                        users.id = ${user_id};
                `)

            if (user.cart_sessions_id && item.product_id) {
                await db.cart_items.destroy({
                    where: {
                        cart_session_id: user.cart_sessions_id,
                        product_id: item.product_id,
                    },
                })
            }
        })

        return {
            err: createOrder ? 0 : 1,
            msg: createOrder ? "Cảm ơn quý khách (づ￣ 3￣)づ" : "Đặt hàng thất bại!",
        }
    } catch (error) {
        return error
    }
}

exports.createOrderAdmin = async (req) => {
    try {
        const uuid = uuidv4() // code for order details
        const user_id = req.body.user_id
        const orders = req.body.orders
        const status_id = req.body.status_id

        if (!user_id || !orders) return { err: 1, msg: "Lỗi!" }

        // First, create order
        const [createOrder, created] = await db.order_details.findOrCreate({
            where: { code: uuid },
            defaults: {
                user_id,
                status_id: status_id || 1, // 1 - Chờ xác nhận
                total: 0,
                code: uuid,
            },
            raw: true,
        })

        if (!created) return { err: 1, msg: "Không khởi tạo được đơn hàng. Vui lòng thử lại!" }

        // Tạo order_item vào đơn hàng trên
        orders.map(async (item) => {
            const product = await db.products.findOne({
                where: { id: item.id },
                attributes: ["id", "price", "discount"],
                raw: true,
            })

            // create order item of order
            await db.order_items.create({
                order_detail_id: createOrder.dataValues.id,
                product_id: item.id,
                quantity: item.quantity,
                pay: calculatePayment(product.price, item.quantity, product.discount),
            })

            const pay = calculatePayment(product.price, item.quantity, product.discount)

            // Update total plus in order_details
            const [updateTotal] = await db.sequelize.query(`
                update order_details set total = total + ${Number(pay) || 0} where id = ${createOrder.dataValues.id};
            `)

            // Đặt hàng rồi thì vô giỏ hàng xóa nó đi
            const [[user]] = await db.sequelize.query(`
                    select
                        users.id,
                        cart_sessions.id as 'cart_sessions_id'
                    from
                        users
                        left join cart_sessions on cart_sessions.user_id = users.id
                    where
                        users.id = ${user_id};
                `)

            if (user.cart_sessions_id && item.id) {
                await db.cart_items.destroy({
                    where: {
                        cart_session_id: user.cart_sessions_id,
                        product_id: item.id,
                    },
                })
            }
        })

        return {
            err: createOrder ? 0 : 1,
            msg: createOrder ? "Cảm ơn quý khách (づ￣ 3￣)づ" : "Đặt hàng thất bại!",
        }
    } catch (error) {
        return error
    }
}

exports.handleOrderStatus = (actionConfirm, actionConfirmed, codeOrder) =>
    new Promise(async (resolve, reject) => {
        try {
            let status_id

            // order_statuses
            switch (actionConfirmed) {
                case actionConfirm.XAC_NHAN_DON_HANG:
                    status_id = 2 // Chờ xác nhận
                    break

                case actionConfirm.DA_LAY_HANG:
                    status_id = 3 // Đang giao
                    break

                case actionConfirm.DA_GIAO:
                    status_id = 4 // Đã giao
                    break

                case actionConfirm.TRA_HANG:
                    status_id = 6 // Trả hàng
                    break

                case actionConfirm.MUA_LAI: // Trường hợp đã trả hàng sau khi "xác nhận mua lại" chuyển sang "chờ lấy hàng" ko cần "chờ xác nhận" nữa
                    status_id = 2 // Chờ xác nhận
                    break

                default:
                    return
            }

            // Change new status for order
            const updateStatus = await db.order_details.update({ status_id }, { where: { code: codeOrder } })

            const order_details_info = await db.order_details.findOne({
                where: { code: codeOrder },
                attributes: ["user_id", "total"],
                raw: true,
            })

            const user_id = order_details_info.user_id
            const order_totalPayment = order_details_info.total

            // Nếu giao hàng thành công (Đã giao) thì cập nhật Tổng thanh toán cho user
            if (actionConfirmed === actionConfirm.DA_GIAO) {
                const [transactionVolume] = await db.sequelize.query(
                    `select transactionVolume from users where id = ${user_id}`
                )

                const newTransactionVolume = Number(transactionVolume[0].transactionVolume) + Number(order_totalPayment)

                await db.sequelize.query(
                    `update users set transactionVolume = ${newTransactionVolume} where id = ${user_id}`
                )
            }

            resolve({
                err: updateStatus ? 0 : 1,
                msg: updateStatus ? `${actionConfirmed}` : "Update Order Status Failure",
            })
        } catch (error) {
            reject(error)
        }
    })

exports.handleIncrease = async (req) => {
    try {
        const order_detail_id = req.body.order_detail_id
        const order_items_id = req.body.order_items_id
        const pay = req.body.pay

        const updateCount = await db.sequelize.query(
            `update order_items set quantity = quantity + 1, pay = pay + ${pay} where id = ${order_items_id}`
        )

        const updateSumOrder = await db.sequelize.query(
            `update order_details set total = total + ${pay} where id = ${order_detail_id}`
        )

        return {
            err: updateSumOrder ? 0 : 1,
            msg: updateSumOrder ? "Successfully" : "Failed",
        }
    } catch (error) {
        return error
    }
}

exports.handleDecrease = async (req) => {
    try {
        const order_detail_id = req.body.order_detail_id
        const order_items_id = req.body.order_items_id
        const pay = req.body.pay

        const updateCount = await db.sequelize.query(
            `update order_items set quantity = quantity - 1, pay = pay - ${pay} where id = ${order_items_id}`
        )

        const updateSumOrder = await db.sequelize.query(
            `update order_details set total = total - ${pay} where id = ${order_detail_id}`
        )

        return {
            err: updateSumOrder ? 0 : 1,
            msg: updateSumOrder ? "Successfully" : "Failed",
        }
    } catch (error) {
        reject(error)
    }
}

exports.handleAddProduct = async (order_detail_id, product_id, quantity) => {
    try {
        // find price and discount of new product
        const infoProduct = await db.products.findOne({
            where: { id: product_id },
            attributes: ["price", "discount"],
            raw: true,
        })

        const price = infoProduct.price
        const discount = infoProduct.discount
        const priceOfProduct = calculatePayment(price, quantity, discount)

        // Add product to order
        const [add, created] = await db.order_items.findOrCreate({
            where: {
                order_detail_id,
                product_id,
            },
            defaults: {
                order_detail_id,
                product_id,
                quantity,
                pay: priceOfProduct,
            },
        })

        if (created) {
            const update = await db.sequelize.query(
                `update order_details set total = total + ${priceOfProduct} where id = ${order_detail_id}`
            )
        }

        return {
            err: created ? 0 : 1,
            msg: created ? "Đã thêm sản phẩm mới!" : "Sản phẩm này đã có trong đơn hàng!",
        }
    } catch (error) {
        return error
    }
}

exports.handleDelete = async (req) => {
    try {
        const order_detail_id = req.body.order_detail_id
        const order_items_id = req.body.order_items_id

        const payOfProduct = await db.order_items.findOne({
            where: { id: order_items_id },
            raw: true,
        })

        const updateTotalPaymentOfOrder = await db.sequelize.query(
            `update order_details set total = total - ${payOfProduct.pay} where id = ${order_detail_id}`
        )

        // Finally, delete product in table order_items
        const deleteItem = await db.order_items.destroy({ where: { id: order_items_id } })

        return {
            err: deleteItem ? 0 : 1,
            msg: deleteItem ? "Đã xóa sản phẩm ra khỏi hóa đơn!" : "Đã xảy ra lỗi!",
        }
    } catch (error) {
        return error
    }
}
