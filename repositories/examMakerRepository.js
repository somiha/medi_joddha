// repositories/examMakerRepository.js
class ExamMakerRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findByUserId(user_id) {
    return await this.model.findAll({
      where: { user_id },
      order: [["created_at", "DESC"]],
    });
  }

  async findAll(where = {}) {
    return await this.model.findAll({ where, order: [["created_at", "DESC"]] });
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

module.exports = ExamMakerRepository;
