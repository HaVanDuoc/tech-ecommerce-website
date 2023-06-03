const db = require("../models")

exports.getBrands = async (link) => {
    try {
        const [response] = await db.sequelize.query(`
            select
                brands.id as brand_id,
                brands.brandId,
                brands.name as brandName,
                brands.link as brandLink,
                categories.alias as categoryAlias,
                categories.name as categoryName,
                categories.link as categoryLink,
                brands.logo
            from
                categorybrands
                left join brands on brands.id = categorybrands.brandId
                left join categories on categories.id = categorybrands.categoryId
            where
                categories.link = "/${link}";
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
