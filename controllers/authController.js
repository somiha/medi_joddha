// controllers/authController.js
const { generateToken } = require("../utils/jwt");

class AuthController {
  constructor(authService) {
    this.authService = authService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async register(req, res) {
    try {
      const userData = req.body;
      const user = await this.authService.register(userData);
      const userInfo = {
        type: "student",
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        mobile_number: user.mobile_number,
      };
      const token = generateToken(userInfo);
      console.log(token);

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
      console.log(mobile_number, password);
      const user = await this.authService.login(mobile_number, password);
      const userInfo = {
        type: "student",
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        mobile_number: user.mobile_number,
      };
      const token = generateToken(userInfo);
      console.log(token);

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

  async getUserProfile(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await this.authService.getUserProfile(userId);

      res.json({
        user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
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

  async updateProfile(req, res) {
    try {
      const id = req.user.id;
      console.log(req.body);
      const {
        full_name,
        institution_type,
        institution_name,
        class: className,
        year,
        admission_type,
        mobile_number,
        email,
        is_draft,
        is_published,
      } = req.body;

      // Build data object only with provided fields
      const data = {};
      if (full_name) data.full_name = full_name;
      if (institution_type) data.institution_type = institution_type;
      if (institution_name) data.institution_name = institution_name;
      if (className) data.class = className;
      if (year) data.year = parseInt(year);
      if (admission_type) data.admission_type = admission_type;
      if (mobile_number) data.mobile_number = mobile_number;
      if (email) data.email = email;
      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      // Image handling
      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/profile/${req.file.filename}`;
      }

      // Call service
      const user = await this.authService.updateProfile(id, data, req.file);

      res.json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
