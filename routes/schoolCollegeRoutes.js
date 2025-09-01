// routes/schoolCollegeRoutes.js
const express = require("express");

const SchoolCollegeService = require("../services/schoolCollegeService");
const SchoolCollegeController = require("../controllers/schoolCollegeController");

const service = new SchoolCollegeService();
const controller = new SchoolCollegeController(service);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.delete("/:id", auth, controller.delete);

module.exports = router;
