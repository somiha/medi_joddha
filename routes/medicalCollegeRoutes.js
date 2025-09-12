// routes/medicalCollegeRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const MedicalCollegeService = require("../services/medicalCollegeService");
const MedicalCollegeController = require("../controllers/medicalCollegeController");

const service = new MedicalCollegeService();
const controller = new MedicalCollegeController(service);

const router = express.Router();

router.post("/", upload.multiUpload, controller.add);
router.put("/:id", upload.multiUpload, controller.update);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.delete("/:id", controller.delete);

module.exports = router;
