// var express = require("express");
import express from "express";
var router = express.Router();
// var getUsers = require("../controllers/getUsers");
// import { getUsers } from "../controllers/getUsers";
// var getUser = require("../controllers/getUser");
// import { getUser } from "../controllers/getUser";
import { getUsers, getUser } from "../controllers/index.js";

/* GET users listing. */
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Sander" },
];
router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", function (req, res, next) {
  try {
    const { userName } = req.body;

    if (!userName) {
      res.status(400).json({ message: "userName is required, you doofus." });
    }
    users.push({ id: users.length + 1, name: userName });
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", function (req, res, next) {
  try {
    const id = req.params.id;
    const { userName } = req.body;
    if (!userName) {
      res.status(400).json({ message: "userName is required, you doofus." });
    }

    users.forEach((user) => {
      if (user.id === parseInt(id)) {
        user.name = userName;
      }
    });

    const user = users.find((user) => user.id === parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const id = parseInt(req.params.id);

    // Find the index of the user
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove user at the correct index
    users.splice(index, 1);

    res.status(200).json({ message: "User deleted successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// module.exports = router;
export default router;
