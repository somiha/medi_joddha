// routes/courseSubjectRoutes.js
const express = require("express");

const CourseSubjectService = require("../services/courseSubjectService");
const CourseSubjectController = require("../controllers/courseSubjectController");

const service = new CourseSubjectService();
const controller = new CourseSubjectController(service);

const router = express.Router();

router.post("/", controller.add);
router.get("/", controller.getAll);
router.get("/course/:courseId", controller.getByCourse);
router.get("/subject/:subjectId", controller.getBySubject);
router.delete("/", controller.remove);

module.exports = router;
