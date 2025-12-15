// routes/chapterRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const ChapterService = require("../services/chapterService");
const ChapterController = require("../controllers/chapterController");

const chapterService = new ChapterService();
const chapterController = new ChapterController(chapterService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", upload.uploadImage, chapterController.create);
router.get("/", chapterController.getAll);
router.get("/:id", chapterController.getById);
router.put("/:id", upload.uploadImage, chapterController.update);
router.delete("/:id", chapterController.delete);

module.exports = router;
