// controllers/authController.js
const { generateToken } = require("../utils/jwt");

class AuthController {
  constructor(authService) {
    this.authService = authService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res) {
    try {
      const userData = req.body;
      const user = await this.authService.register(userData);
      const token = generateToken(user.id);

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { mobile_number, password } = req.body;
      const user = await this.authService.login(mobile_number, password);
      const token = generateToken(user.id);

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          mobile_number: user.mobile_number,
        },
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
  static async forgotPasswordSendOtp(req, res) {
    try {
      const { mobile_number } = req.body;
      if (!mobile_number) {
        return res.status(400).json({ error: "Mobile number is required" });
      }

      const authService = new (require("../services/authService"))();
      await authService.sendOtp(mobile_number);

      res.json({ message: "OTP sent to your mobile number" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async forgotPasswordVerifyOtp(req, res) {
    try {
      const { mobile_number, otp } = req.body;
      if (!mobile_number || !otp) {
        return res
          .status(400)
          .json({ error: "Mobile number and OTP are required" });
      }

      const authService = new (require("../services/authService"))();
      const result = await authService.verifyOtp(mobile_number, otp);

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { user_id, new_password } = req.body;
      if (!user_id || !new_password) {
        return res
          .status(400)
          .json({ error: "User ID and new password are required" });
      }
      if (new_password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }

      const authService = new (require("../services/authService"))();
      await authService.resetPassword(user_id, new_password);

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
