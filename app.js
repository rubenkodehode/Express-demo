import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import db from "./sequelize.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

db.sync({ alter: false });

import dotenv from "dotenv";
dotenv.config();

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import hashRouter from "./routes/hashRouter.js";
import { login } from "./controllers/login.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.listen(5500, () => console.log("Server running on port 5500"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hash", hashRouter);
app.use("/login", login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: err.message });
});

// module.exports = app;
export default app;
