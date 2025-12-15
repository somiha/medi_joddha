// routes/questionRoutes.js
const express = require("express");

// Import specific upload handlers from middleware
const {
  upload,
  uploadQuestionImage,
  uploadAnswerImage,
  uploadDesImage,
  uploadOption1Image,
  uploadOption2Image,
  uploadOption3Image,
  uploadOption4Image,
  uploadOption5Image,
} = require("../middleware/upload");

const QuestionService = require("../services/questionService");
const QuestionController = require("../controllers/questionController");

const service = new QuestionService();
const controller = new QuestionController(service);

const router = express.Router();

// GET /api/questions/random?subject_id=8&chapter_id=6&topic_id=2&is_board=0&total=10
router.get("/random", controller.getRandomQuestions);

// 🔹 GET ROUTES
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.get("/subject/:subjectId", controller.getBySubject);
router.get(
  "/subject/:subjectId/chapter/:chapterId",
  controller.getBySubjectAndChapter
);
router.get(
  "/subject/:subjectId/chapter/:chapterId/topic/:topicId",
  controller.getBySubjectChapterTopic
);
router.get("/topic/:topicId/bookRef/:bookRefId", controller.getByTopicBookRef);

// 🔹 CREATE (supports any image field)
router.post("/", upload.any(), controller.create); // Accepts any image field

// 🔹 UPDATE - Specific image uploads
router.put("/:id", upload.any(), controller.update); // Any field update
router.put("/:id/image/question", uploadQuestionImage, controller.update);
router.put("/:id/image/answer", uploadAnswerImage, controller.update);
router.put("/:id/image/des", uploadDesImage, controller.update);
router.put("/:id/image/option1", uploadOption1Image, controller.update);
router.put("/:id/image/option2", uploadOption2Image, controller.update);
router.put("/:id/image/option3", uploadOption3Image, controller.update);
router.put("/:id/image/option4", uploadOption4Image, controller.update);
router.put("/:id/image/option5", uploadOption5Image, controller.update);
// 🔹 DELETE
router.delete("/:id", controller.delete);

module.exports = router;
