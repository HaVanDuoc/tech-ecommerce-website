const db = require("../models")

exports.headerSuggest = async (key, limit) => {
    try {
        const query = `SELECT
                          products.id,
                          products.name,
                          products.price,
                          products.discount,
                          products.files,
                          categories.name as 'category',
                          categories.alias
                      FROM
                          products
                      LEFT JOIN
                          categories on categories.categoryId = products.categoryId
                      Where
                          products.name LIKE "%${key}%"
                      LIMIT
                          ${limit};`

        const [result] = await db.sequelize.query(query)

        return {
            err: result ? 0 : 1,
            msg: result ? "Get successfully" : "Get failure",
            data: result ? result : null,
        }
    } catch (error) {
        return error
    }
}

exports.headerRecent = async (req) => {
    try {
        const user_id = req.user.id

        const query = `
                    select
                    *
                    from
                        searches
                        left join (
                            select
                                products.id,
                                products.name,
                                products.price,
                                products.discount,
                                products.files,
                                categories.alias
                            from
                                products
                                left join categories on categories.categoryId = products.categoryId
                        ) as temp on temp.id = searches.product_id
                        where searches.user_id = ${user_id}
                    order by
                        searches.createdAt desc
                    limit
                        6;
                `

        const [response] = await db.sequelize.query(query)

        return {
            err: response ? 0 : 1,
            msg: response ? "Get successfully" : "Get failure",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.headerSaveRecent = async (product_id, user_id) => {
    try {
        // Trường hợp đã tìm trước đó có trong database
        // Tìm và xóa cái cũ đi
        // sau đó thêm cái mới vào

        // Giới hạn mỗi user chỉ lưu 20 sản phẩm gần nhất
        // Đầu tiên kiểm tra đủ 20 lượt tìm kiếm chưa
        // nếu đủ thì xóa cái cuối đi
        // Sau đó lưu cái mới vào

        const [countRecent] = await db.sequelize.query(
            `select count(*) as 'count' from searches where user_id = "${user_id}"`
        )

        if (countRecent[0].count === 20) {
            // find id last item in search recent
            var [lastSearch] = await db.sequelize.query(`select id from searches order by createdAt limit 1`)

            // delete
            await db.searches.destroy({ where: { id: lastSearch[0].id } })

            // update
            var updateRecent = await db.searches.create({ user_id, product_id })
        } else {
            var updateRecent = await db.searches.create({ user_id, product_id })
        }

        return {
            err: updateRecent ? 0 : 1,
            msg: updateRecent ? "Update successfully" : "Update failure",
        }
    } catch (error) {
        return error
    }
}
