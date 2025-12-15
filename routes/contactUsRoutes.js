// routes/contactUsRoutes.js
const express = require("express");

const ContactUsService = require("../services/contactUsService");
const ContactUsController = require("../controllers/contactUsController");

const service = new ContactUsService();
const controller = new ContactUsController(service);

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
