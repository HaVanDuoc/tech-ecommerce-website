const db = require("../models")
const destroyUpload = require("../utils/destroyUpload")

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

exports.getBrand = async (req) => {
    try {
        const brand_id = req.body.brand_id
        const brandId = req.body.brandId

        const response = await db.brands.findOne({
            where: { brandId },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        })

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
            data: response,
        }
    } catch (error) {
        return error
    }
}

exports.updateBrand = async (req) => {
    try {
        const brandId = req.body.brandId
        const name = req.body.name
        const alias = req.body.alias
        const image = req.files

        // Check name brand is exists?
        if (name) {
            let response = await db.brands.findOne({ where: { name } })
            if (response) {
                destroyUpload(image) // delete images in cloud
                return {
                    err: 1,
                    msg: "Thương hiệu này đã tồn tại!",
                }
            }
        }

        // update
        let response = await db.brands.update({ name, alias, image }, { where: { brandId } })

        // If update fail, delete image in cloud
        if (!response) destroyUpload(image)

        return {
            err: response ? 0 : 1,
            msg: response ? "Cập nhật thành công!" : "Cập nhật thất bại!",
        }
    } catch (error) {
        return error
    }
}
