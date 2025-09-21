// routes/questionRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const QuestionService = require("../services/questionService");
const QuestionController = require("../controllers/questionController");

const questionService = new QuestionService();
const questionController = new QuestionController(questionService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", upload.single("image"), questionController.create);
router.get("/", questionController.getAll);
router.get("/:id", questionController.getById);
router.put("/:id", upload.single("image"), questionController.update);
router.delete("/:id", questionController.delete);

router.get("/subject/:subjectId", questionController.getBySubject);
router.get(
  "/subject/:subjectId/chapter/:chapterId",
  questionController.getBySubjectAndChapter
);
router.get(
  "/subject/:subjectId/chapter/:chapterId/topic/:topicId",
  questionController.getBySubjectChapterTopic
);

router.get(
  "/topic/:topicId/bookRef/:bookRefId",
  questionController.getByTopicBookRef
);

module.exports = router;
