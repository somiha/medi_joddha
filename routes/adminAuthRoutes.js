// routes/adminAuthRoutes.js
const express = require("express");
const { body, validationResult } = require("express-validator");

const AdminAuthService = require("../services/adminAuthService");
const AdminAuthController = require("../controllers/adminAuthController");

const authService = new AdminAuthService();
const authController = new AdminAuthController(authService);

const router = express.Router();
const auth = require("../middleware/auth");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  "/register",
  [
    body("full_name").notEmpty().withMessage("Full name is required"),
    body("mobile_number")
      .optional()
      .notEmpty()
      .withMessage("Mobile number is required if provided"),
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

router.post("/forgot/otp", AdminAuthController.forgotPasswordSendOtp);
router.post("/forgot/verify", AdminAuthController.forgotPasswordVerifyOtp);
router.post("/reset", AdminAuthController.resetPassword);

module.exports = router;
