import db from "../config/sequelize.js"; // ✅ Correct path
import bcrypt from "bcryptjs"; // ✅ Use bcryptjs for compatibility
import jwt from "jsonwebtoken"; // ✅ Add JWT for authentication
import { QueryTypes } from "sequelize"; // ✅ Ensure QueryTypes is imported

export const login = async (req, res, next) => {
  try {
    const { uname, pword } = req.body;

    console.log("Login attempt:", uname);

    if (!uname || !pword) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Retrieve user info including hashed password
    const user = await db.query(
      "SELECT PersonID, HPassword FROM v_PersonDataWithUserInfo WHERE Username = :uname",
      {
        replacements: { uname },
        type: QueryTypes.SELECT,
        plain: true,
      }
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(pword, user.HPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log("Login successful for PersonID:", user.PersonID);

    // Generate JWT token
    const token = jwt.sign(
      { personID: user.PersonID, username: uname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // ✅ Return JWT token
      personID: user.PersonID,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
