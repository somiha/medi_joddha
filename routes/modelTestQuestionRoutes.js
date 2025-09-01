// routes/modelTestQuestionRoutes.js
const express = require("express");

const ModelTestQuestionService = require("../services/modelTestQuestionService");
const ModelTestQuestionController = require("../controllers/modelTestQuestionController");
const db = require("../models");
const ModelTestRepository = require("../repositories/modelTestRepository");
const QuestionRepository = require("../repositories/questionRepository");
const ModelTestQuestionRepository = require("../repositories/modelTestQuestionRepository");

const ModelTest = db.ModelTest;
const Question = db.Question;
const ModelTestQuestion = db.ModelTestQuestion;

const modelTestRepo = new ModelTestRepository(ModelTest);
const questionRepo = new QuestionRepository(Question);
const modelTestQuestionRepo = new ModelTestQuestionRepository(
  ModelTestQuestion
);

const service = new ModelTestQuestionService(
  modelTestQuestionRepo,
  modelTestRepo,
  questionRepo
);

const controller = new ModelTestQuestionController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/:model_test_id/questions", auth, controller.addQuestions);

router.get("/:model_test_id/questions", auth, controller.getQuestions);

router.delete("/:model_test_id/questions", auth, controller.removeQuestions);

module.exports = router;
