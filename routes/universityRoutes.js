// routes/universityRoutes.js
const express = require("express");

const UniversityService = require("../services/universityService");
const UniversityController = require("../controllers/universityController");

const universityService = new UniversityService();
const universityController = new UniversityController(universityService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", universityController.create);
router.get("/", universityController.getAll);
router.get("/:id", universityController.getById);
router.delete("/:id", universityController.delete);

module.exports = router;
