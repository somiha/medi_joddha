// controllers/adminAuthController.js
const { generateToken } = require("../utils/jwt");

class AdminAuthController {
  constructor(authService) {
    this.authService = authService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    try {
      const userData = req.body;
      const admin = await this.authService.register(userData);

      const adminInfo = {
        type: "admin",
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        mobile_number: admin.mobile_number,
      };
      const token = generateToken(adminInfo);

      res.status(201).json({
        message: "Admin registered successfully",
        token,
        admin: {
          id: admin.id,
          full_name: admin.full_name,
          email: admin.email,
          mobile_number: admin.mobile_number,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { mobile_number, password } = req.body;
      console.log(mobile_number, password);
      const admin = await this.authService.login(mobile_number, password);

      const adminInfo = {
        type: "admin",
        id: admin.id,
        full_name: admin.full_name,
        email: admin.email,
        mobile_number: admin.mobile_number,
      };
      const token = generateToken(adminInfo);

      res.json({
        message: "Login successful",
        token,
        admin: {
          id: admin.id,
          full_name: admin.full_name,
          email: admin.email,
          mobile_number: admin.mobile_number,
        },
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async forgotPasswordSendOtp(req, res) {
    try {
      const { identifier } = req.body;
      if (!identifier) {
        return res
          .status(400)
          .json({ error: "Email or mobile number is required" });
      }

      const authService = new (require("../services/adminAuthService"))();
      await authService.sendOtp(identifier);

      res.json({ message: "OTP sent to your email or mobile number" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async forgotPasswordVerifyOtp(req, res) {
    try {
      const { identifier, otp } = req.body;
      if (!identifier || !otp) {
        return res
          .status(400)
          .json({ error: "Identifier and OTP are required" });
      }

      const authService = new (require("../services/adminAuthService"))();
      const result = await authService.verifyOtp(identifier, otp);

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { admin_id, new_password } = req.body;
      if (!admin_id || !new_password) {
        return res
          .status(400)
          .json({ error: "Admin ID and new password are required" });
      }
      if (new_password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }

      const authService = new (require("../services/adminAuthService"))();
      await authService.resetPassword(admin_id, new_password);

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AdminAuthController;
