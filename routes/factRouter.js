import express from "express";
import {
  getFacts,
  getRandomFact,
  getFactById,
  createFact,
} from "../controllers";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getFacts);

router.get("/random", authMiddleware, getRandomFact);

router.get("/:id", authMiddleware, getFactById);

router.get("/", authMiddleware, createFact);

export default router;
