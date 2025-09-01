const express = require("express");
const upload = require("../middleware/upload");

const TopicService = require("../services/topicService");
const TopicController = require("../controllers/topicController");

const topicService = new TopicService();
const topicController = new TopicController(topicService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", upload.single("image"), topicController.create);
router.get("/", topicController.getAll);
router.get("/:id", topicController.getById);
router.put("/:id", upload.single("image"), topicController.update);
router.delete("/:id", topicController.delete);

module.exports = router;
