// controllers/authController.js
const { generateToken } = require("../utils/jwt");
const AuthService = require("../services/authService");

class AuthController {
  static async register(req, res) {
    try {
      const userData = req.body;
      const authService = new AuthService();
      const user = await authService.register(userData);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          full_name: user.full_name,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { mobile_number, password } = req.body;
      const authService = new AuthService();
      const user = await authService.login(mobile_number, password);

      const token = generateToken(user.id);
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          is_premium: user.is_premium,
        },
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
