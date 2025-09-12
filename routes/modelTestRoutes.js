// routes/modelTestRoutes.js
const express = require("express");

const ModelTestService = require("../services/modelTestService");
const ModelTestController = require("../controllers/modelTestController");
const ModelTestRepository = require("../repositories/modelTestRepository");
const db = require("../models");

const repo = new ModelTestRepository(db.ModelTest);
const service = new ModelTestService(repo);
const controller = new ModelTestController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.get("/:id/details", auth, controller.getByIdWithTypeName);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
