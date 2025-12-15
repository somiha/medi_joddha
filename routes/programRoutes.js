// routes/programRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const ProgramService = require("../services/programService");
const ProgramController = require("../controllers/programController");
const studentAuthMiddleware = require("../middleware/studentAuthMiddleware");

const programService = new ProgramService();
const programController = new ProgramController(programService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", upload.uploadImage, programController.create);
router.get("/", programController.getAll);
router.get("/:id", programController.getById);
router.put("/:id", upload.uploadImage, programController.update);
router.delete("/:id", programController.delete);

module.exports = router;
