const db = require("../models")
const { getOffset } = require("../utils/calculator")

exports.getOrder = async (req) => {
    try {
        const user_id = req.user.id
        const tab = req.body.tab || "Tất cả"
        const page = req.body.page || 1
        const limit = 10
        const offset = getOffset(page, limit)

        var response = new Object()

        const getAmountProducts = async () => {
            const query = `select
                                    count(*) as amount_order
                                from
                                    order_details
                                    left join order_statuses on order_statuses.id = order_details.status_id
                                where
                                    order_details.user_id = 26
                                    ${tab !== "Tất cả" ? 'and order_statuses.status = "' + tab + '"' : ""};`

            const [[amount]] = await db.sequelize.query(query)

            return amount.amount_order
        }

        const amountProducts = await getAmountProducts()

        response["amountProducts"] = amountProducts
        response["amountPages"] = Math.ceil(amountProducts / limit)
        response["orders"] = []

        let [orderList] = await db.sequelize.query(`
            select
                order_details.id,
                order_details.code,
                order_details.total,
                order_statuses.status,
                order_details.createdAt
            from
                order_details
                left join order_statuses on order_statuses.id = order_details.status_id
            where
                order_details.user_id = ${user_id}
                ${tab !== "Tất cả" ? 'and order_statuses.status = "' + tab + '"' : ""}
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

                response.orders.push(item)
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
            await db.Order_Detail.update({ status_id: 1 }, { where: { id: data.order_details_id } })

            return {
                err: 0,
                msg: "Mua lại thành công!",
            }
        }

        // Ngược lại Chờ xác nhận thì chuyển thành Hủy
        if (response[0].status === "Chờ xác nhận") {
            await db.Order_Detail.update({ status_id: 5 }, { where: { id: data.order_details_id } })
            return {
                err: 0,
                msg: "Đã hủy đơn hàng!",
            }
        }
    } catch (error) {
        return error
    }
}
