// routes/bookRefRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const BookRefService = require("../services/bookRefService");
const BookRefController = require("../controllers/bookRefController");

const service = new BookRefService();
const controller = new BookRefController(service);

const router = express.Router();

// Add with optional image
router.post("/", upload.single("image"), controller.add);

// Get all with pagination
router.get("/", controller.getAll);

// Get by ID
router.get("/:id", controller.getById);

// Get by subject_id
router.get("/subject/:subject_id", controller.getBySubjectId);

// Update
router.put("/:id", upload.single("image"), controller.update);

// Delete
router.delete("/:id", controller.delete);

module.exports = router;
