import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/sequelize.js";
import { QueryTypes, Sequelize } from "sequelize.js";

export const register = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ message: "Alle felt må fylles ut" });
    }

    // Check if user already exists
    const existingUser = await db.query(
      "SELECT id FROM users WHERE email = :email",
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Bruker med denne e-posten finnes allerede" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await db.query(
      "INSERT INTO users (email, firstName, lastName, hashedPassword) VALUES (:email, :firstName, :lastName, :hashedPassword)",
      {
        replacements: { email, firstName, lastName, hashedPassword },
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Bruker opprettet!" });
  } catch (error) {
    console.error("Error in register:", error); // ✅ Add better error logging
    res.status(500).json({ message: "Serverfeil", error });
  }
};
