const { notFound } = require("../middleware/handleError")
const userRoute = require("./userRoute")
const adminRoute = require("./adminRoute")
const dbRoute = require("./dbRoute")
const sectionProduct = require("./sectionProduct")
const pageProduct = require("./pageProduct")
const productDetails = require("./client/productDetails")
const productsClient = require("./client/products")
const profile = require("./client/profile")

//
const authRoute = require("./authRoute")
const searchRoute = require("./searchRoute")
const cartRoute = require("./cartRoute")
const categoryRoute = require("./categoryRoute")
const brandRoute = require("./brandRoute")
const productRoute = require("./productRoute")

const adminUserRoute = require("./admin/users")
const adminProductRoute = require("./admin/products")
const adminOrderRoute = require("./admin/orders")

const initRoute = (app) => {
    const v1 = "/api/v1"

    app.use(`${v1}/auth`, authRoute)
    app.use(`${v1}/search`, searchRoute)
    app.use(`${v1}/cart`, cartRoute)
    app.use(`${v1}/category`, categoryRoute)
    app.use(`${v1}/brand`, brandRoute)
    app.use(`${v1}/product`, productRoute)

    // Admin routes
    app.use(`${v1}/admin/users`, adminUserRoute)
    app.use(`${v1}/admin/products`, adminProductRoute)
    app.use(`${v1}/admin/orders`, adminOrderRoute)

    // Routes
    app.use("/api/v1/user", userRoute)
    app.use("/api/v1/admin", adminRoute)
    app.use("/api/v1/db", dbRoute)
    app.use("/api/v1/sectionProduct", sectionProduct) // Section list Product
    app.use("/api/v1/client/productDetails", productDetails) //

    // Client routes
    app.use("/api/v1/client/pageProduct/", pageProduct)
    app.use("/api/v1/client/products", productsClient)
    app.use("/api/v1/client/profile", profile)

    // Route không xác định được response error not found
    return app.use(notFound)
}

module.exports = initRoute
