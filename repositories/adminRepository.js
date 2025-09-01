// repositories/adminRepository.js
class AdminRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }

  async findByMobile(mobile_number) {
    return await this.model.findOne({ where: { mobile_number } });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const admin = await this.model.findByPk(id);
    if (!admin) return null;
    return await admin.update(data);
  }
}

module.exports = AdminRepository;
