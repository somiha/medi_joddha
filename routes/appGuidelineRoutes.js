// routes/appGuidelineRoutes.js
const express = require("express");
const { uploadVideo } = require("../middleware/upload");

const AppGuidelineService = require("../services/appGuidelineService");
const AppGuidelineController = require("../controllers/appGuidelineController");

const service = new AppGuidelineService();
const controller = new AppGuidelineController(service);

const router = express.Router();

router.post("/", uploadVideo, controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", uploadVideo, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
