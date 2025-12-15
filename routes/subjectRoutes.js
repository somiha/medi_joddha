// routes/subjectRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const SubjectService = require("../services/subjectService");
const SubjectController = require("../controllers/subjectController");

const subjectService = new SubjectService();
const subjectController = new SubjectController(subjectService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", upload.uploadImage, subjectController.create);
router.get("/", subjectController.getAll);
router.get("/:id", subjectController.getById);
router.put("/:id", upload.uploadImage, subjectController.update);
router.delete("/:id", subjectController.delete);

module.exports = router;
