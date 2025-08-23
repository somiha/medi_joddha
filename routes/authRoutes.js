// routes/authRoutes.js
const express = require("express");
const { body, validationResult } = require("express-validator");

const AuthService = require("../services/authService");
const AuthController = require("../controllers/authController");

const authService = new AuthService();
const authController = new AuthController(authService);

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/signup",
  [
    body("full_name").notEmpty().withMessage("Full name is required"),
    // body("email").isEmail().withMessage("Email is invalid"),
    body("mobile_number").notEmpty().withMessage("Mobile number is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  authController.register
);

router.post(
  "/login",
  [
    body("mobile_number").notEmpty().withMessage("Mobile number is required"),
    body("password").exists().withMessage("Password is required"),
  ],
  validate,
  authController.login
);

router.post("/forgot/otp", AuthController.forgotPasswordSendOtp);
router.post("/forgot/verify", AuthController.forgotPasswordVerifyOtp);
router.post("/reset", AuthController.resetPassword);

module.exports = router;
