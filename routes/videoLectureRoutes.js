// routes/videoLectureRoutes.js
const express = require("express");

const VideoLectureService = require("../services/videoLectureService");
const VideoLectureController = require("../controllers/videoLectureController");

const service = new VideoLectureService();
const controller = new VideoLectureController(service);

const router = express.Router();

// Public or authenticated access
router.post("/", controller.create); // Create
router.get("/", controller.getAll); // Get all (paginated)
router.get("/:id", controller.getById); // Get by ID
router.get("/subject/:subject_id", controller.getBySubjectId); // By subject
router.get("/chapter/:chapter_id", controller.getByChapterId); // By chapter
router.put("/:id", controller.update); // Update
router.delete("/:id", controller.delete); // Delete

module.exports = router;
