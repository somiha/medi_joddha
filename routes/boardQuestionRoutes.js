// routes/boardQuestionRoutes.js
const express = require("express");

const BoardQuestionService = require("../services/boardQuestionService");
const BoardQuestionController = require("../controllers/boardQuestionController");

const service = new BoardQuestionService();
const controller = new BoardQuestionController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.get("/board/:boardId", auth, controller.getByBoard);
router.get(
  "/subject/:subjectId/chapter/:chapterId",
  controller.getBySubjectAndChapter
);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

router.post("/bulk", auth, controller.createBulk);

module.exports = router;
