import db from "../sequelize.js";
import { QueryTypes } from "sequelize";

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await db.query(
      "SELECT id, email, firstName, lastName FROM users WHERE id = :id",
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Bruker ikke funnet" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Serverfeil", error });
  }
};
