// repositories/test_typeRepository.js
class TestTypeRepository {
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
    const test_type = await this.model.findByPk(id);
    if (!test_type) return null;
    await test_type.destroy();
    return test_type;
  }
}

module.exports = TestTypeRepository;
