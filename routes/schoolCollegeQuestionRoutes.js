// routes/schoolCollegeQuestionRoutes.js
const express = require("express");

const SchoolCollegeQuestionService = require("../services/schoolCollegeQuestionService");
const SchoolCollegeQuestionController = require("../controllers/schoolCollegeQuestionController");

const service = new SchoolCollegeQuestionService();
const controller = new SchoolCollegeQuestionController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.get("/school/:schoolCollegeId", auth, controller.getBySchoolCollege);
router.get(
  "/subject/:subjectId/chapter/:chapterId",
  controller.getBySubjectAndChapter
);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

router.post("/bulk", auth, controller.createBulk);

module.exports = router;
