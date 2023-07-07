const { Sequelize } = require("sequelize")

// const host = process.env.HOST
// const database = process.env.DATABASE
// const username = process.env.USER
// const password = process.env.PASSWORD
// const port = process.env.DB_PORT

const host = process.env.MYSQL_ADDON_HOST
const database = process.env.MYSQL_ADDON_DB
const username = process.env.MYSQL_ADDON_USER
const password = process.env.MYSQL_ADDON_PASSWORD
const port = process.env.MYSQL_ADDON_PORT

const sequelize = new Sequelize(database, username, password, {
    username,
    database,
    password,
    host: host,
    dialect: "mysql",
    port: port,
    logging: false,
    timezone: "+07:00",
})

const ConnectionDatabase = async () => {
    try {
        await sequelize
            .authenticate()
            .then(() => console.log(`Đã kết nối database '${database}' tại host '${host}' thành công!`))
    } catch (error) {
        console.error("Kết nối CSDL thất bại:", error)
    }
}

module.exports = ConnectionDatabase
