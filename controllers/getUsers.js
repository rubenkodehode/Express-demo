// var db = require("../sequelize");
import db from "../sequelize.js";

export const getUsers = async (req, res, next) => {
  const dbUsers = await db.query("select * from t_Person");
  res.status(200).json(dbUsers);
};

// module.exports = getUsers;
