const { notFound } = require("../middleware/handleError")
const adminRoute = require("./adminRoute")

const authRoute = require("./authRoute")
const searchRoute = require("./searchRoute")
const cartRoute = require("./cartRoute")
const categoryRoute = require("./categoryRoute")
const brandRoute = require("./brandRoute")
const productRoute = require("./productRoute")
const orderRoute = require("./orderRoute")
const userRoute = require("./userRoute")

const initRoute = (app) => {
    const v1 = "/api/v1"

    app.use(`${v1}/auth`, authRoute)
    app.use(`${v1}/search`, searchRoute)
    app.use(`${v1}/cart`, cartRoute)
    app.use(`${v1}/category`, categoryRoute)
    app.use(`${v1}/brand`, brandRoute)
    app.use(`${v1}/product`, productRoute)
    app.use(`${v1}/user`, userRoute)
    app.use(`${v1}/order`, orderRoute)

    app.use("/api/v1/admin", adminRoute)

    // Route không xác định được response error not found
    return app.use(notFound)
}

module.exports = initRoute
