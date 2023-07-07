const db = require("../models")
const destroyUpload = require("../utils/destroyUpload")

exports.getCategories = async () => {
    try {
        const [response] = await db.sequelize.query(`
            select
                categories.id,
                categories.categoryId,
                categories.name,
                categories.view,
                categories.alias,
                categories.image,
                count.sumProducts
            from
                categories
                left join (
                    select
                        categoryId,
                        count(*) as sumProducts
                    from
                        products
                    group by
                        categoryId
                ) count on count.categoryId = categories.categoryId             
            order by view desc;
        `)

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}

exports.getCategory = async (req) => {
    try {
        const category_id = req.body.category_id
        const categoryId = req.body.categoryId

        const [categories] = await db.sequelize.query(`
            select 
                categories.id,
                categories.categoryId,
                categories.name,
                categories.alias,
                categories.image,
                categories.view
            from 
                categories
            where 
                id > -1
                ${category_id ? 'and categories.id = "' + category_id + '"' : ""}
                ${categoryId ? 'and categories.categoryId = "' + categoryId + '"' : ""};
        `)

        const [brands] = await db.sequelize.query(`
            select
                brands.id,
                brands.brandId,
                brands.name
            from
                categorybrands
                left join categories on categorybrands.categoryId = categories.id
                left join brands on categorybrands.brandId = brands.id
            where
                categorybrands.id > -1
                ${category_id ? 'and categories.id = "' + category_id + '"' : ""}
                ${categoryId ? 'and categories.categoryId = "' + categoryId + '"' : ""};
        `)

        let response = new Object()

        response["id"] = categories[0].id
        response["categoryId"] = categories[0].categoryId
        response["name"] = categories[0].name
        response["alias"] = categories[0].alias
        response["image"] = categories[0].image
        response["view"] = categories[0].view

        response["brands"] = brands

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response ? response : [],
        }
    } catch (error) {
        return error
    }
}

exports.updateCategory = async (req) => {
    try {
        const categoryId = req.body.categoryId
        const name = req.body.name
        const alias = req.body.alias
        const image = req.files

        // Update brands
        // if (Array.isArray(brands) && brands.length > 0) {
        //     // get id to categoryId
        //     const [responseIdCategory] = await sequelize.query(
        //         `select id from categories where categoryId = "${categoryId}"`
        //     )
        //     const idCategory = responseIdCategory[0].id

        //     // Remove all brands
        //     const remove = async () => {
        //         await db.categorybrands.destroy({
        //             where: {
        //                 categoryId: idCategory,
        //             },
        //         })
        //     }

        //     remove()

        //     // Update new brands
        //     brands.map(async (name) => {
        //         const [responseIdBrand] = await sequelize.query(`select id from brands where name = "${name}"`)
        //         const idBrand = responseIdBrand[0].id

        //         await db.categorybrands.findOrCreate({
        //             where: { categoryId: idCategory, brandId: idBrand },
        //             defaults: {
        //                 categoryId: idCategory,
        //                 brandId: idBrand,
        //             },
        //         })
        //     })
        // }

        if (name) {
            // Check name is exists
            const { count } = await db.categories.findAndCountAll({
                where: { name: data.name },
                attributes: ["id", "name"],
                raw: true,
            })

            // Count > 0 tìm thấy
            if (count !== 0) {
                destroyUpload(image) // delete images in cloud
                return {
                    err: 1,
                    msg: "Danh mục này đã tồn tại",
                }
            }
        }

        const response = await db.categories.update(
            { name, alias, image },
            {
                where: { categoryId },
                raw: true,
            }
        )

        // If update fail, delete image in cloud
        if (!response) destroyUpload(image)

        return {
            err: response ? 0 : 1,
            msg: response ? "Cập nhật thành công" : "Cập nhật thất bại",
        }
    } catch (error) {
        return error
    }
}
