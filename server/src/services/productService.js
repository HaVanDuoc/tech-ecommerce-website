const db = require("../models")

exports.getProducts = async (req) => {
    try {
        const category = req.body.category
        const brand = req.body.brand
        const page = req.body.page || 1
        const sortBy = req.body.sortBy || "createdAt"
        const limit = req.body.limit || 12

        const offset = limit * (page - 1)

        const [list] = await db.sequelize.query(`
            select
                products.id as product_id,
                products.productId,
                products.name as product_name,
                products.price as product_price,
                products.discount as product_discount,
                products.stock as product_stock,
                brands.name as product_brand,
                categories.name as product_category,
                categories.link as category_link,
                products.files as product_image
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > 0
                ${category ? 'and categories.link = "' + category + '"' : ""}
                ${brand ? 'and brands.name = "' + brand + '"' : ""}
            order by 
                products.${sortBy} desc
            limit
                ${limit}
            offset
                ${offset};
        `)

        const [counter] = await db.sequelize.query(`
            select
                count(*) as counter_products
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > 0
                ${category ? 'and categories.link = "' + category + '"' : ""}
                ${brand ? 'and brands.name = "' + brand + '"' : ""};
        `)

        let response = new Object()
        const counterProduct = counter[0].counter_products

        response["limitOfPage"] = limit
        response["currentPage"] = page
        response["counterPage"] = Math.ceil(counterProduct / limit)
        response["counterProduct"] = counterProduct
        response["list"] = list

        return {
            err: response ? 0 : 1,
            msg: response ? "Get products successfully" : "Get products failure",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.getProduct = async (req) => {
    try {
        const productId = req.body.productId

        const [product] = await db.sequelize.query(`
            select
                products.id as id,
                products.productId as code,
                products.name as name,
                products.price as price,
                products.discount as discount,
                products.stock as stock,
                products.rating as rating,
                products.isActive as status,
                brands.name as brand,
                categories.name as category,
                categories.link as category_link,
                products.files as images
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > -1
                ${productId ? 'and products.productId = "' + productId + '"' : ""};
        `)

        return {
            err: product ? 0 : 1,
            msg: product ? "Get products successfully" : "Get products failure",
            data: product ? product[0] : null,
        }
    } catch (error) {
        return error
    }
}

exports.updateImage = async (productId, files, deleted) => {
    try {
        const response = await db.Product.findOne({
            where: { productId },
            attributes: ["files"],
            raw: true,
        })

        let available = response.files

        if (!available) available = []

        const deleteImages = (available, deleted) => {
            for (let i = 0; i < deleted.length; i++) {
                available = available.filter((item) => item.path !== deleted[i].path)
            }
            return available
        }

        if (deleted) available = deleteImages(available, deleted)

        const addImages = (available, files) => {
            return [...available, ...files]
        }

        if (files) available = addImages(available, files)

        const update = await db.Product.update({ files: available }, { where: { productId } })

        return {
            err: update !== 0 ? 0 : 1,
            msg: update !== 0 ? "Đã cập nhật hình ảnh sản phẩm!" : "Lỗi: Cập nhật thất bại!",
            data: update !== 0 ? update : null,
            latest: update !== 0 ? null : files,
        }
    } catch (error) {
        return error
    }
}

exports.updateInfo = async (data) => {
    try {
        const { name, stock, price, discount, productId } = data

        let newData = { name, stock, price, discount }

        // Kiểm tra tên đã sủ dụng hay chưa
        if (name) {
            const [response] = await db.sequelize.query(`select * from products where name = '${name}' limit 1`)

            if (response.length > 0)
                return {
                    err: 1,
                    msg: "Tên sản phẩm này đã được sử dụng!",
                    data: null,
                }
        }

        // Lấy cái stock cũ cộng với stock được thêm vào
        if (stock) {
            const [response] = await db.sequelize.query(
                `select stock from products where productId = '${productId}' limit 1`
            )

            newData.stock = Number(response[0]?.stock) + Number(stock)
        }

        const response = await db.Product.update(newData, {
            where: { productId },
        })

        return {
            err: response ? 0 : 1,
            msg: response ? "Cập nhật thành công!" : "Cập nhật thất bại!",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.getProductsAdmin = async (page) => {
    try {
        const limit = 3
        const offset = (page - 1) * limit || 0

        const [amount] = await db.sequelize.query(`select count(*) as 'count' from products`)

        const [response] = await db.sequelize.query(`
            select
                products.id,
                products.productId,
                products.name,
                products.files,
                products.price,
                products.stock,
                products.isActive
            from
                products
            order by
                products.createdAt desc
            limit ${limit} 
            offset ${offset};
        `)

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failure",
            limit: limit ? limit : 1,
            all: amount ? amount[0].count : null,
            counterPage: response ? Math.ceil(amount[0].count / limit) : null,
            images: response ? response : null,
        }
    } catch (error) {
        return error
    }
}
