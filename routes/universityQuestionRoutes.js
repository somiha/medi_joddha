// routes/universityQuestionRoutes.js
const express = require("express");

const UniversityQuestionService = require("../services/universityQuestionService");
const UniversityQuestionController = require("../controllers/universityQuestionController");

const service = new UniversityQuestionService();
const controller = new UniversityQuestionController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.get("/university/:universityId", auth, controller.getByUniversity);
router.get(
  "/subject/:subjectId/chapter/:chapterId",
  controller.getBySubjectAndChapter
);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

router.post("/bulk", auth, controller.createBulk);

module.exports = router;
