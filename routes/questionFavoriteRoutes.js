// routes/questionFavoriteRoutes.js
const express = require("express");
const QuestionFavoriteService = require("../services/questionFavoriteService");
const QuestionFavoriteController = require("../controllers/questionFavoriteController");

const service = new QuestionFavoriteService();
const controller = new QuestionFavoriteController(service);

const router = express.Router();

// Create favorite
router.post("/", controller.create);

// Toggle favorite (add/remove)
router.post("/toggle", controller.toggleFavorite);

// Get all favorites (with pagination and filters)
router.get("/", controller.getAll);

// Get favorite by ID
router.get("/:id", controller.getById);

// Get favorites by user ID (with filters: subject_id, course_id, chapter_id)
router.get("/user/:userId", controller.getByUser);

// Check if question is favorited by user
router.get("/user/:userId/check/:questionId", controller.checkFavorite);

// Delete favorite
router.delete("/:id", controller.delete);

// Remove favorite by user and question
router.delete("/user/:userId/question/:questionId", controller.removeFavorite);

module.exports = router;
