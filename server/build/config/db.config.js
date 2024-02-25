require("dotenv").config();
const {
  Sequelize
} = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/env.config.js")[env];
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mysql",
  logging: false,
  query: {
    raw: true
  },
  timezone: "+07:00"
});
const ConnectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    if (env === "development") await sequelize.sync({
      force: true
    });
    console.log("[server] Connection has been established successfully.");
    console.log(`[server] Running on environment ${env}`);
    console.log(`[server] Database ${config.database}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = ConnectionDatabase;