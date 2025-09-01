// repositories/universityRepository.js
class UniversityRepository {
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
    const university = await this.model.findByPk(id);
    if (!university) return null;
    await university.destroy();
    return university;
  }
}

module.exports = UniversityRepository;
