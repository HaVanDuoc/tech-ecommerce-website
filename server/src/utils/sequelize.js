const { Sequelize } = require("sequelize");

const database = process.env.DATABASE || "tech";
const username = process.env.USER || "root";
const password = process.env.PASSWORD || "MS.1810duoc2000";

const sequelize = new Sequelize(database, username, password, {
  host: process.env.HOST || "localhost",
  dialect: "mysql",
  logging: false,
  query: { raw: true },
  timezone: "+07:00",
  dialectOptions: {
    socketPath: process.env.GCP_INSTANCE,
  },
});

module.exports = sequelize;
