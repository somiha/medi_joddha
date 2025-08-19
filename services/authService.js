// services/authService.js
const { hashPassword } = require("../utils/hash");
const UserRepository = require("../repositories/userRepository");
const db = require("../models");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository(db.User);
  }

  async register(userData) {
    const { email, mobile_number } = userData;

    if (email) {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) throw new Error("Email already in use");
    }

    const existingMobile = await this.userRepository.findByMobile(
      mobile_number
    );
    if (existingMobile) throw new Error("Mobile number already in use");

    userData.password = await hashPassword(userData.password);
    return await this.userRepository.createUser(userData);
  }

  async login(mobile_number, password) {
    const user = await this.userRepository.findByMobile(mobile_number);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await hashPassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return user;
  }
}

module.exports = AuthService;
