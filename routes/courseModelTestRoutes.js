// routes/courseModelTestRoutes.js
const express = require("express");

const CourseModelTestService = require("../services/courseModelTestService");
const CourseModelTestController = require("../controllers/courseModelTestController");

const service = new CourseModelTestService();
const controller = new CourseModelTestController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, controller.add);

router.post("/bulk", auth, controller.addBulk);

router.get("/course/:courseId", auth, controller.getByCourse);

router.get(
  "/model-test/:modelTestId/courses",
  auth,
  controller.getCoursesByTest
);

router.delete("/", auth, controller.remove);

module.exports = router;
