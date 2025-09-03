// routes/premiumProgramUserRoutes.js
const express = require("express");

const PremiumProgramUserService = require("../services/premiumProgramUserService");
const PremiumProgramUserController = require("../controllers/premiumProgramUserController");

const service = new PremiumProgramUserService();
const controller = new PremiumProgramUserController(service);

const router = express.Router();

// Admin only routes
router.post("/", controller.add);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
