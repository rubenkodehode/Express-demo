import db from "../config/sequelize.js"; // ✅ Ensure correct database import
import { QueryTypes } from "sequelize";

// Get all facts
export const getFacts = async (req, res) => {
  try {
    const facts = await db.query("SELECT * FROM facts", {
      type: QueryTypes.SELECT,
    });
    res.status(200).json(facts);
  } catch (error) {
    console.error("Error in getFacts:", error);
    res.status(500).json({ message: "Serverfeil", error });
  }
};

// Get random fact
export const getRandomFact = async (req, res) => {
  try {
    const fact = await db.query("SELECT TOP 1 * FROM facts ORDER BY NEWID()", {
      type: QueryTypes.SELECT,
    });

    res.status(200).json(fact[0] || { message: "Ingen fakta funnet" });
  } catch (error) {
    console.error("Error in getRandomFact:", error);
    res.status(500).json({ message: "Serverfeil", error });
  }
};

// Get fact by ID
export const getFactById = async (req, res) => {
  try {
    const fact = await db.query("SELECT * FROM facts WHERE id = :id", {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    if (fact.length === 0) {
      return res.status(404).json({ message: "Fakta ikke funnet" });
    }

    res.status(200).json(fact[0]);
  } catch (error) {
    console.error("Error in getFactById:", error);
    res.status(500).json({ message: "Serverfeil", error });
  }
};

// Create a new fact
export const createFact = async (req, res) => {
  try {
    const { fact } = req.body;

    if (!fact) {
      return res.status(400).json({ message: "Fakta må fylles ut" });
    }

    await db.query("INSERT INTO facts (fact) VALUES (:fact)", {
      replacements: { fact },
      type: QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Fakta opprettet!" });
  } catch (error) {
    console.error("Error in createFact:", error);
    res.status(500).json({ message: "Serverfeil", error });
  }
};
