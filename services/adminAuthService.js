// services/adminAuthService.js
const { hashPassword } = require("../utils/hash");
const AdminRepository = require("../repositories/adminRepository");
const db = require("../models");

const { Op } = db.sequelize;

class AdminAuthService {
  constructor() {
    this.adminRepository = new AdminRepository(db.Admin);
  }

  async register(userData) {
    const { email, mobile_number } = userData;

    if (email) {
      const existing = await this.adminRepository.findByEmail(email);
      if (existing) throw new Error("Email already in use");
    }

    const existingMobile = await this.adminRepository.findByMobile(
      mobile_number
    );
    if (existingMobile) throw new Error("Mobile number already in use");

    userData.password = await hashPassword(userData.password);
    return await this.adminRepository.create(userData);
  }

  async login(mobile_number, password) {
    const admin = await this.adminRepository.findByMobile(mobile_number);

    if (!admin) throw new Error("Invalid credentials");

    const isMatch = await hashPassword(password, admin.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return admin;
  }

  async sendOtp(identifier) {
    const admin = await this.adminRepository.findByMobile(mobile_number);

    if (!admin) {
      throw new Error("No admin found with this email or mobile number");
    }

    const otp = "123456";
    const otp_expires_at = new Date(Date.now() + 5 * 60 * 1000);

    await admin.update({ otp, otp_expires_at });
    console.log(`🔐 OTP for ${identifier}: ${otp}`);

    return { message: "OTP sent successfully", identifier };
  }

  async verifyOtp(identifier, otp) {
    const admin = await this.adminRepository.findByMobile(mobile_number);

    if (!admin) throw new Error("Admin not found");

    if (!admin.otp || admin.otp !== otp) throw new Error("Invalid OTP");

    if (!admin.otp_expires_at || new Date() > admin.otp_expires_at) {
      throw new Error("OTP has expired");
    }

    await admin.update({ otp: null, otp_expires_at: null });

    return { message: "OTP verified", admin_id: admin.id };
  }

  async resetPassword(admin_id, new_password) {
    const admin = await this.adminRepository.findById(admin_id);
    if (!admin) throw new Error("Admin not found");

    const hashed = await hashPassword(new_password);
    await admin.update({ password: hashed });

    return { message: "Password reset successfully" };
  }
}

module.exports = AdminAuthService;
