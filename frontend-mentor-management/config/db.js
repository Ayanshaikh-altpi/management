const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootpassword",
  database: "management",
});

module.exports = db;
