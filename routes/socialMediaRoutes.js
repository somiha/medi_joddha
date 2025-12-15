// routes/socialMediaRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const SocialMediaService = require("../services/socialMediaService");
const SocialMediaController = require("../controllers/socialMediaController");

const service = new SocialMediaService();
const controller = new SocialMediaController(service);

const router = express.Router();

router.post("/", upload.uploadImage, controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", upload.uploadImage, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
