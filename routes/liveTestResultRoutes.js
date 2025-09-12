// routes/liveTestRoutes.js
const express = require("express");

const LiveTestResultService = require("../services/liveTestResultService");
const LiveTestResultController = require("../controllers/liveTestResultController");

const service = new LiveTestResultService();
const controller = new LiveTestResultController(service);

const router = express.Router();

router.post("/", controller.add);
router.get("/user/:user_id", controller.getByUserId);
router.get("/test/:test_id", controller.getByTestId);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
