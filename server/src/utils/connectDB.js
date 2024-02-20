const { Sequelize } = require("sequelize")
require("dotenv").config()
const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../config/config.js")[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: "mysql",
    logging: false,
    query: {
        raw: true,
    },
    timezone: "+07:00",
})

const ConnectionDatabase = async () => {
    try {
        await sequelize.authenticate().then(() => {
            console.log(`Env ${env}`)
            console.log(`Đã kết nối database '${config.database}' tại host '${config.host}:${config.port}' thành công!`)
        })
    } catch (error) {
        console.error("Kết nối CSDL thất bại:", error)
    }
}

module.exports = ConnectionDatabase
