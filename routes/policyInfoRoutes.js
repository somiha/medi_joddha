// routes/policyInfoRoutes.js
const express = require("express");

const PolicyInfoService = require("../services/policyInfoService");
const PolicyInfoController = require("../controllers/policyInfoController");

const service = new PolicyInfoService();
const controller = new PolicyInfoController(service);

const router = express.Router();

router.post("/", controller.create); // Create first record
router.get("/", controller.get); // Get single record
router.put("/:id", controller.update); // Update by ID
router.delete("/:id", controller.delete); // Delete by ID

module.exports = router;
