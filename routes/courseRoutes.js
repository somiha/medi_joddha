// routes/courseRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

// Import service
const CourseService = require("../services/courseService");
const CourseController = require("../controllers/courseController");

// Create service and controller instances
const courseService = new CourseService();
const courseController = new CourseController(courseService);

const router = express.Router();

router.post("/", upload.single("image"), courseController.create);
router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);
router.put("/:id", upload.single("image"), courseController.update);
router.delete("/:id", courseController.delete);

module.exports = router;
