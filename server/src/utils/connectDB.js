const { Sequelize } = require("sequelize");

const database = process.env.DATABASE;
const username = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  logging: false,
  query: { raw: true },
  timezone: "+07:00",
});

try {
  sequelize.authenticate();
  console.log(`Kết nối CSDL ${database} thành công...`);
} catch (error) {
  console.error("Kết nối CSDL thất bại:", error);
}
