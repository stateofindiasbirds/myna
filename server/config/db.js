const Sequelize = require("sequelize");
require("dotenv").config();
const db = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.username,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432, // default PostgreSQL port
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This setting is required for SSL connections
    },
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000, // maximum time (in milliseconds) that a connection can be idle in the pool before being released
  },
});

module.exports = db;