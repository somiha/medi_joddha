// routes/programRoutes.js
const express = require("express");
const upload = require("../middleware/upload");
const ProgramController = require("../controllers/programController");

const router = express.Router();

router.post("/", upload.single("image"), ProgramController.create);

router.get("/", ProgramController.getAll);

router.get("/:id", ProgramController.getById);

router.put("/:id", upload.single("image"), ProgramController.update);

router.delete("/:id", ProgramController.delete);

module.exports = router;
