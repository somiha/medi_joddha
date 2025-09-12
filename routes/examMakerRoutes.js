// routes/examMakerRoutes.js
const express = require("express");

const ExamMakerService = require("../services/examMakerService");
const ExamMakerController = require("../controllers/examMakerController");

const service = new ExamMakerService();
const controller = new ExamMakerController(service);

const router = express.Router();

router.post("/", controller.createExam);
router.get("/:id", controller.getById);
router.get("/", controller.getAll);
router.get("/user/:user_id", controller.getByUserId);
router.post("/:id/submit", controller.submitAnswers);
router.delete("/:id", controller.delete);

module.exports = router;
