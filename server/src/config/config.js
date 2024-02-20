require("dotenv").config()

module.exports = {
    development: {
        username: "root",
        password: "123456",
        database: "tech",
        host: "127.0.0.1",
        port: "3306",
        dialect: "mysql",
        logging: false,
        timezone: "+07:00",
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
        timezone: "+07:00",
    },
}
