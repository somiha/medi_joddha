// routes/test_typeRoutes.js
const express = require("express");

const TestTypeService = require("../services/testTypeService");
const TestTypeController = require("../controllers/testTypeController");

const test_typeService = new TestTypeService();
const test_typeController = new TestTypeController(test_typeService);

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", test_typeController.create);
router.get("/", test_typeController.getAll);
router.get("/:id", test_typeController.getById);
router.delete("/:id", test_typeController.delete);

module.exports = router;
