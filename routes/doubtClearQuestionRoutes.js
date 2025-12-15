// routes/doubtClearQuestionRoutes.js
const express = require("express");

const DoubtClearQuestionService = require("../services/doubtClearQuestionService");
const DoubtClearQuestionController = require("../controllers/doubtClearQuestionController");
const upload = require("../middleware/upload");

const service = new DoubtClearQuestionService();
const controller = new DoubtClearQuestionController(service);

const router = express.Router();

router.post("/", upload.uploadImage, controller.add);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/name/:name", controller.getByName);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
