// routes/authRoutes.js
const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("full_name").notEmpty(),
    body("mobile_number").notEmpty(),
    body("password").isLength({ min: 6 }),
  ],
  AuthController.register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  AuthController.login
);

module.exports = router;
