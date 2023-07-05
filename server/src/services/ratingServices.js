exports.getRatingList = async (req) => {
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
