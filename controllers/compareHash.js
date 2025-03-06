import bcrypt from "bcrypt";

export const compareHash = async (req, res, next) => {
  const { password, hashedPassword } = req.body;
  if (!password || !hashedPassword) {
    return res
      .status(400)
      .json({ message: "password and hashed password required" });
  }

  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  res.status(200).json({ isCorrectPassword });
};
