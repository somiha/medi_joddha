// repositories/liveTestRepository.js
class LiveTestResultRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findByUserId(user_id) {
    return await this.model.findAll({
      where: { user_id },
      order: [["created_at", "DESC"]],
    });
  }

  async findByTestId(test_id) {
    return await this.model.findAll({
      where: { test_id },
      order: [["created_at", "DESC"]],
    });
  }

  async findByUserAndTestId(user_id, test_id) {
    return await this.model.findOne({
      where: { user_id, test_id },
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
}

module.exports = LiveTestResultRepository;
