import bcrypt from "bcrypt";

const users = [];

export const hashValue = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password is required" });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);

  return res.status(200).json(user);
};
