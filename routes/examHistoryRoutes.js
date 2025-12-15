// routes/examHistoryRoutes.js
const express = require("express");
const ExamHistoryService = require("../services/examHistoryService");
const ExamHistoryController = require("../controllers/examHistoryController");

const service = new ExamHistoryService();
const controller = new ExamHistoryController(service);

const router = express.Router();

// POST: Create exam history
router.post("/", controller.create);

// GET: Get all exam histories (with optional filters)
router.get("/", controller.getAll);

// GET: Get specific exam history by ID
router.get("/:id", controller.getById);

// GET: Get exam histories by user ID
router.get("/user/:userId", controller.getByUserId);

// GET: Get statistics for a user
router.get("/user/:userId/statistics", controller.getStatistics);

// DELETE: Delete exam history
router.delete("/:id", controller.delete);

module.exports = router;
