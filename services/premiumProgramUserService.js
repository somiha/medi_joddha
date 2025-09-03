// services/premiumProgramUserService.js
const {
  Sequelize: { Op },
} = require("sequelize");
const PremiumProgramUserRepository = require("../repositories/premiumProgramUserRepository");
const db = require("../models");

class PremiumProgramUserService {
  constructor() {
    this.repo = new PremiumProgramUserRepository(db.PremiumProgramUser);
  }

  async add(data, adminId) {
    const { userId, programId, note } = data;

    if (!userId || !programId) {
      throw new Error("User ID and Program ID are required");
    }

    // Validate user and program exist
    const user = await db.User.findByPk(userId);
    if (!user) throw new Error("User not found");

    const program = await db.Program.findByPk(programId);
    if (!program) throw new Error("Program not found");

    // Prevent duplicate
    const existing = await this.repo.findByUserAndProgram(userId, programId);
    if (existing) {
      throw new Error("User already has access to this program");
    }

    return await this.repo.create({
      userId,
      programId,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdBy: adminId || null,
      updatedBy: adminId || null,
      note: note || null,
    });
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { userId, programId, isActive, search } = query;
    const where = {};

    if (userId) where.userId = userId;
    if (programId) where.programId = programId;
    if (isActive !== undefined) where.isActive = isActive === "true";

    if (search) {
      where[Op.or] = [
        { "$User.full_name$": { [Op.like]: `%${search}%` } },
        { "$Program.name$": { [Op.like]: `%${search}%` } },
        { note: { [Op.like]: `%${search}%` } },
      ];
    }

    return await this.repo.findAll(where, offset, limit);
  }

  async getById(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Premium program access not found");
    return record;
  }

  async update(id, data, adminId) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Record not found");

    const updates = { ...data };
    if (adminId) updates.updatedBy = adminId;

    return await record.update(updates);
  }

  async delete(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Record not found");
    await record.destroy();
    return { message: "Access removed successfully" };
  }
}

module.exports = PremiumProgramUserService;
