// routes/doubtClearQuestionAnswerRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const DoubtClearQuestionAnswerService = require("../services/doubtClearQuestionAnswerService");
const DoubtClearQuestionAnswerController = require("../controllers/doubtClearQuestionAnswerController");

const service = new DoubtClearQuestionAnswerService();
const controller = new DoubtClearQuestionAnswerController(service);

const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, upload.single("image"), controller.add);
router.get("/", auth, controller.getAll);
router.get("/question/:questionId", auth, controller.getByQuestion);
router.put("/:id", auth, upload.single("image"), controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
