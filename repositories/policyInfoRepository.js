// repositories/PolicyInfoRepository.js
class PolicyInfoRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const [affectedCount] = await this.model.update(data, {
      where: { id },
    });
    if (affectedCount === 0) return null;
    return await this.model.findByPk(id);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return record;
  }
}

module.exports = PolicyInfoRepository;
