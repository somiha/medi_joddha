// routes/schoolCollegeRoutes.js
const express = require("express");

const SchoolCollegeService = require("../services/schoolCollegeService");
const SchoolCollegeController = require("../controllers/schoolCollegeController");

const service = new SchoolCollegeService();
const controller = new SchoolCollegeController(service);

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.delete("/:id", controller.delete);

module.exports = router;
