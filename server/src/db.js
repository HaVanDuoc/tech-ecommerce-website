const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MS.1810duoc2000",
  database: "ecommercetech",
});

module.exports = db;
