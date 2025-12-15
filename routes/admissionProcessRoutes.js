// routes/admissionProcessRoutes.js
const express = require("express");

const AdmissionProcessService = require("../services/admissionProcessService");
const AdmissionProcessController = require("../controllers/admissionProcessController");
const upload = require("../middleware/upload");

const service = new AdmissionProcessService();
const controller = new AdmissionProcessController(service);

const router = express.Router();

router.post("/", upload.uploadImage, controller.add);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
