const { Sequelize } = require("sequelize")

require("dotenv").config()

const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../config/config.js")[env]

const sequelize = new Sequelize(config?.database, config?.username, config?.password, config)

const ConnectionDatabase = async () => {
    try {
        await sequelize
            .authenticate()
            .then(() => console.log(`Đã kết nối database '${config?.database}' tại host '${config?.host}' thành công!`))
            .then(() => console.log(`Running on environment ${process.env.NODE_ENV}`))
    } catch (error) {
        console.error("Kết nối CSDL thất bại:", error)
    }
}

module.exports = ConnectionDatabase
