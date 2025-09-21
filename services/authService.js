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

  async sendOtp(mobile_number) {
    const user = await this.userRepository.findByMobile(mobile_number);
    if (!user) {
      throw new Error("No user found with this mobile number");
    }

    const otp = "123456";
    const otp_expires_at = new Date(Date.now() + 5 * 60 * 1000);
    await user.update({ otp, otp_expires_at });
    console.log(`🔐 OTP for ${mobile_number}: ${otp}`);

    return { message: "OTP sent successfully", mobile_number };
  }

  async verifyOtp(mobile_number, otp) {
    const user = await this.userRepository.findByMobile(mobile_number);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.otp || user.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    if (!user.otp_expires_at || new Date() > user.otp_expires_at) {
      throw new Error("OTP has expired");
    }

    await user.update({ otp: null, otp_expires_at: null });

    return { message: "OTP verified", user_id: user.id };
  }

  async resetPassword(user_id, new_password) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new Error("User not found");
    }

    const hashed = await hashPassword(new_password);
    await user.update({ password: hashed });

    return { message: "Password reset successfully" };
  }

  async getUserProfile(user_id) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateProfile(userId, data, file) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    if (file && user.image) {
      await deleteImage(user.image); // assuming deleteImage helper exists
    }

    return await user.update(data);
  }
}

module.exports = AuthService;
