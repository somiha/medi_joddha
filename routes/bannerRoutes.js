// routes/bannerRoutes.js
const express = require("express");
const upload = require("../middleware/upload");

const BannerService = require("../services/bannerService");
const BannerController = require("../controllers/bannerController");

const service = new BannerService();
const controller = new BannerController(service);

const router = express.Router();

// Create banner
router.post("/", upload.single("image"), controller.create);

// Get all banners (with pagination)
router.get("/", controller.getAll);

// Delete banner
router.delete("/:id", controller.delete);

module.exports = router;
