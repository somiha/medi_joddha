// routes/schoolCollegeQuestionRoutes.js
const express = require("express");

const SchoolCollegeQuestionService = require("../services/schoolCollegeQuestionService");
const SchoolCollegeQuestionController = require("../controllers/schoolCollegeQuestionController");

const service = new SchoolCollegeQuestionService();
const controller = new SchoolCollegeQuestionController(service);

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/school/:schoolCollegeId", controller.getBySchoolCollege);
router.get(
  "/subject/:subjectId/chapter/:chapterId",
  controller.getBySubjectAndChapter
);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
