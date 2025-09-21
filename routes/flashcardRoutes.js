// routes/flashcardRoutes.js
const express = require("express");

const FlashcardService = require("../services/flashcardService");
const FlashcardController = require("../controllers/flashcardController");

const service = new FlashcardService();
const controller = new FlashcardController(service);

const router = express.Router();

// Get all flashcards with filters
router.get("/", controller.getAll);

// Get single flashcard by ID
router.get("/:id", controller.getById);

module.exports = router;
