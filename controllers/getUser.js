// var db = require("../sequelize");
import db from "../sequelize.js";

export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [users] = await db.query(`select * from t_Person where ID = ${id} `);
    const user = users[0];
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports = getUser;
