const db = require("../models")

exports.getCategories = async () => {
    try {
        const [response] = await db.sequelize.query(`
            select
                categories.id as category_id,
                categories.categoryId,
                categories.name as categoryName,
                categories.alias,
                categories.link as accessLink,
                count.count_product,
                categories.createdAt,
                categories.illustration as image
            from
                categories
                left join (
                    select
                        categoryId,
                        count(*) as count_product
                    from
                        products
                    group by
                        categoryId
                ) count on count.categoryId = categories.categoryId;
        `)

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failed",
            data: response,
        }
    } catch (error) {
        return error
    }
}
