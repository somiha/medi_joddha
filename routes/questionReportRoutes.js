// routes/questionReportRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const QuestionReportService = require("../services/questionReportService");
const QuestionReportController = require("../controllers/questionReportController");

const service = new QuestionReportService();
const controller = new QuestionReportController(service);

const router = express.Router();

// Create question report (with image upload)
router.post("/", upload.uploadImage, controller.create);

// Get all question reports (with pagination and filters)
router.get("/", controller.getAll);

// Get question report by ID
router.get("/:id", controller.getById);

// Accept question report
router.patch("/:id/accept", controller.accept);

// Decline question report
router.patch("/:id/decline", controller.decline);

// Delete question report
router.delete("/:id", controller.delete);

module.exports = router;
