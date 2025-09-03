// routes/doubtClearQuestionAnswerRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const DoubtClearQuestionAnswerService = require("../services/doubtClearQuestionAnswerService");
const DoubtClearQuestionAnswerController = require("../controllers/doubtClearQuestionAnswerController");

const service = new DoubtClearQuestionAnswerService();
const controller = new DoubtClearQuestionAnswerController(service);

const router = express.Router();

// Upload middleware for image
router.post("/", upload.single("image"), controller.add);
router.get("/", controller.getAll);
router.get("/question/:questionId", controller.getByQuestion);
router.put("/:id", upload.single("image"), controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
