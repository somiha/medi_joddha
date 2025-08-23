// routes/boardQuestionRoutes.js
const express = require("express");

const BoardQuestionService = require("../services/boardQuestionService");
const BoardQuestionController = require("../controllers/boardQuestionController");

const service = new BoardQuestionService();
const controller = new BoardQuestionController(service);

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/board/:boardId", controller.getByBoard);
router.get(
  "/subject/:subjectId/chapter/:chapterId",
  controller.getBySubjectAndChapter
);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
