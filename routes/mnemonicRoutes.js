// routes/mnemonicRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const MnemonicService = require("../services/mnemonicService");
const MnemonicController = require("../controllers/mnemonicController");

const service = new MnemonicService(require("../models"));
const controller = new MnemonicController(service);

const router = express.Router();

router.post("/", upload.single("image"), controller.create);
router.get("/subject/:subject_id", controller.getBySubjectId);
router.get("/chapter/:chapter_id", controller.getByChapterId);
router.get("/topic/:topic_id", controller.getByTopicId);
router.get("/:id", controller.getById);
router.put("/:id", upload.single("image"), controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
