const db = require("../models")

exports.getBrands = async (req) => {
    try {
        const category = req.body.category
        const alias = req.body.alias

        const [response] = await db.sequelize.query(`
            select
                brands.id,
                brands.brandId,
                brands.name,
                brands.image,
                brands.view
            from
                categorybrands
                left join brands on brands.id = categorybrands.brandId
                left join categories on categories.id = categorybrands.categoryId
            where
                categorybrands.id > -1 
                ${category ? 'and categories.name = "' + category + '"' : ""}
                ${alias ? 'and categories.alias = "' + alias + '"' : ""}
            order by
                brands.view desc;
        `)

        return {
            err: response ? 0 : 1,
            msg: response ? "Get successfully" : "Get failure",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}
