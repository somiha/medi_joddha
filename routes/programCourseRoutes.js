// routes/programCoursesRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const CourseService = require("../services/courseService");
const CourseController = require("../controllers/courseController");

const courseService = new CourseService();
const courseController = new CourseController(courseService);

const router = express.Router();

router.get("/:programId/courses", courseController.getByProgram);

module.exports = router;
