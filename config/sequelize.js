import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PSW,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mssql",
  }
);

// module.exports = db;
export default db;
