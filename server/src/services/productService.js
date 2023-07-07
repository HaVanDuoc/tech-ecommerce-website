const db = require("../models")
const { v4: uuidv4 } = require("uuid")
const { padProductId } = require("../helper/padLeft")
const { calculatePayment } = require("../utils/calculator")
const destroyUpload = require("../utils/destroyUpload")

exports.getProducts = async (req) => {
    try {
        const category = req.body.category
        const brand = req.body.brand
        const page = req.body.page || 1
        const sortBy = req.body.sortBy || "createdAt"
        const limit = req.body.limit || 12
        const user_id = req?.user?.id

        const offset = limit * (page - 1)

        const [list] = await db.sequelize.query(`
            select
                products.id as product_id,
                products.productId,
                products.name as product_name,
                products.price as product_price,
                products.discount as product_discount,
                products.stock as product_stock,
                products.files as product_image,
                brands.name as product_brand,
                categories.name as product_category,
                categories.alias as category_alias
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > 0
                ${category ? 'and categories.alias = "' + category + '"' : ""}
                ${brand ? 'and brands.name = "' + brand + '"' : ""}
            order by 
                products.${sortBy} desc
            limit
                ${limit}
            offset
                ${offset};
        `)

        // Check product in Cart
        if (user_id) {
            list.map(async (item) => {
                const product_id = item.product_id

                const [response] = await db.sequelize.query(`
                    select
                        *
                    from
                        cart_sessions
                        left join cart_items on cart_sessions.id = cart_items.cart_session_id
                        left join users on users.id = cart_sessions.user_id
                    where
                        users.id = ${user_id}
                        and cart_items.product_id = ${product_id};
                `)

                if (response && response.length) {
                    item["inCart"] = true // has in cart
                } else {
                    item["inCart"] = false // no has in cart
                }
            })
        }

        const [counter] = await db.sequelize.query(`
            select
                count(*) as counter_products
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > 0
                ${category ? 'and categories.alias = "' + category + '"' : ""}
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
        const productName = req.body.nameProduct
        const user = req.user

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
                products.files as images
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > -1
                ${productId ? 'and products.productId = "' + productId + '"' : ""}
                ${productName ? 'and products.name = "' + productName + '"' : ""};
        `)

        if (user) {
            // Check product has in cart
            const product_id = product[0].id
            const user_id = user.id

            const [response] = await db.sequelize.query(`
                select
                    *
                from
                    cart_sessions
                    left join cart_items on cart_sessions.id = cart_items.cart_session_id
                    left join users on users.id = cart_sessions.user_id
                where
                    users.id = ${user_id}
                    and cart_items.product_id = ${product_id};
            `)

            if (response && response.length) {
                product[0]["inCart"] = true // has in cart
            } else {
                product[0]["inCart"] = false // no has in cart
            }
        }

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
        const response = await db.products.findOne({
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

        const update = await db.products.update({ files: available }, { where: { productId } })

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

        const response = await db.products.update(newData, {
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

exports.addCart = async (req) => {
    try {
        const user_id = req.user.id
        const product_id = req.body.product_id

        if (!user_id && !product_id) return

        // First, find `cart_session_id`
        const cart_session_id = await db.cart_sessions.findOne({
            where: { user_id },
            attributes: ["id"],
            raw: true,
        })

        // get info product
        const product = await db.products.findOne({
            where: { id: product_id },
            attributes: ["id", "price", "discount"],
            raw: true,
        })

        // Second, check to see if the product is already in shopping cart
        // if yes, delete it otherwise, add it
        const checkAdd = await db.cart_items.findOrCreate({
            where: { cart_session_id: cart_session_id.id, product_id },
            defaults: {
                cart_session_id: cart_session_id.id,
                product_id,
                quantity: 1,
                pay: calculatePayment(product.price, 1, product.discount),
            },
        })

        if (!checkAdd[1]) {
            const destroy = await db.cart_items.destroy({
                where: { cart_session_id: cart_session_id.id, product_id },
            })

            resolve({
                err: destroy ? 0 : 1,
                msg: destroy && "Đã xóa sản phẩm khỏi giỏ hàng",
            })
        }

        return {
            err: checkAdd ? 0 : 1,
            msg: checkAdd && "Đã thêm sản phẩm vào giỏ hàng",
            // data: checkAdd ? checkAdd[0] : null,
        }
    } catch (error) {
        return error
    }
}

exports.updateView = async (req) => {
    try {
        const product_id = req.body.product_id

        const response = await db.sequelize.query(`update products set view = view + 1 where id = ${product_id};`)

        return {
            err: response ? 0 : 1,
            msg: response ? "Successfully" : "Failure",
        }
    } catch (error) {
        return error
    }
}

exports.createProduct = async (req) => {
    try {
        const { name, price, stock, category, brand, discount } = req.body
        const files = req.files

        // Create Product Id
        const query = `select productId from products order by id desc limit 1;`
        const [lastId] = await db.sequelize.query(query, { raw: true }) // Get uid of user final e.g 'U00000006'
        const sliceId = lastId[0].productId.slice(-8) // get 8 char final to result e.g '00000006'
        const productId = padProductId(parseInt(sliceId) + 1) // parseInt is convert 00000006 to 6

        const response = await db.products.findOrCreate({
            where: { name },
            defaults: {
                productId,
                name,
                files,
                price: price || 0,
                stock: stock || 0,
                discount: discount || 0,
                categoryId: category,
                brandId: brand,
            },
            raw: true,
        })

        // if error, delete files uploaded
        if (!response[1]) destroyUpload(files)

        return {
            err: response[1] ? 0 : 1,
            msg: response[1] ? "Đã tạo sản phẩm!" : `${name} đã tồn tại!`,
            data: response[1] ? response[0] : null,
        }
    } catch (error) {
        return error
    }
}

exports.checkNameProduct = async (key) => {
    try {
        const response = await db.products.findOne({ where: { name: key } })

        return {
            err: response ? 1 : 0,
            msg: response ? "Đã có sản phẩm này!" : "Có thế sử dụng tên này!",
        }
    } catch (error) {
        return error
    }
}

exports.searchProduct = async (req) => {
    try {
        const key = req.body.key
        const limit = req.body.limit || 3

        if (!key) return { err: 1, msg: "Vui lòng thông tin nào về sản phẩm!" }

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
                          categories.name LIKE "%${key}%"
                          or products.name LIKE "%${key}%"
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
