// routes/courseRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const CourseService = require("../services/courseService");
const CourseController = require("../controllers/courseController");

const courseService = new CourseService();
const courseController = new CourseController(courseService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", upload.uploadImage, courseController.create);
router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);
router.put("/:id", upload.uploadImage, courseController.update);
router.delete("/:id", courseController.delete);

module.exports = router;
