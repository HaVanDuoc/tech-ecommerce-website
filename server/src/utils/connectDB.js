const { Sequelize } = require("sequelize")

const database = process.env.DATABASE
const username = process.env.USER
const password = process.env.PASSWORD
const host = process.env.HOST
const port = process.env.DB_PORT

const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: "mysql",
    timezone: "+07:00",
    query: { raw: true },
})

const ConnectionDatabase = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: true })
        console.log(`Đã kết nối database '${database}' tại host '${host}' thành công!`)
    } catch (error) {
        console.error("Kết nối CSDL thất bại:", error)
    }
}

module.exports = ConnectionDatabase
