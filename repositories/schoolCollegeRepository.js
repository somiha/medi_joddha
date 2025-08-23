// repositories/schoolCollegeRepository.js
class SchoolCollegeRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll() {
    return await this.model.findAll({ order: [["id", "ASC"]] });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return record;
  }
}

module.exports = SchoolCollegeRepository;
