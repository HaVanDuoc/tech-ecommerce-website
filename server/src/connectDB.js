const { Sequelize } = require("sequelize");

const database = "tech";
const username = "root";
const password = "MS.1810duoc2000";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
  logging: false, // không ghi lại nhật ký
});

const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Kết nối CSDL ${database} thành công...`);
  } catch (error) {
    console.error("Kết nối CSDL thất bại:", error);
  }
};

connectionDatabase();
