// routes/admissionNoticeRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const AdmissionNoticeService = require("../services/admissionNoticeService");
const AdmissionNoticeController = require("../controllers/admissionNoticeController");

const service = new AdmissionNoticeService();
const controller = new AdmissionNoticeController(service);

const router = express.Router();

router.post("/", upload.single("image"), controller.add);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", upload.single("image"), controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
