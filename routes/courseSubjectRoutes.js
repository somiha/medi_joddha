// routes/courseSubjectRoutes.js
const express = require("express");

const CourseSubjectService = require("../services/courseSubjectService");
const CourseSubjectController = require("../controllers/courseSubjectController");

const service = new CourseSubjectService();
const controller = new CourseSubjectController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, controller.add);
router.get("/", auth, controller.getAll);
router.get("/course/:courseId", auth, controller.getByCourse);
router.get("/subject/:subjectId", auth, controller.getBySubject);
router.delete("/", auth, controller.remove);

module.exports = router;
