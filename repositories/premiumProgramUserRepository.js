// repositories/premiumProgramUserRepository.js
class PremiumProgramUserRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(where = {}, offset = 0, limit = 10) {
    return await this.model.findAndCountAll({
      where,
      offset,
      limit,
      order: [["id", "DESC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return record;
  }

  // Optional: Find by userId and programId
  async findByUserAndProgram(userId, programId) {
    return await this.model.findOne({
      where: { userId, programId },
    });
  }
}

module.exports = PremiumProgramUserRepository;
