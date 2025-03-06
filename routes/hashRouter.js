import express from "express";
import { hashValue, compareHash, login } from "../controllers/index.js";
var router = express.Router();

router.post("/", hashValue);
// router.get("/", hashValue);
router.get("/", compareHash);

// router.get("/login", login);
router.post("/", login);

export default router;
