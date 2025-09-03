// repositories/doubtClearQuestionAnswerRepository.js
class DoubtClearQuestionAnswerRepository {
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
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findByQuestionId(questionId) {
    return await this.model.findAll({
      where: { doubtClearQuestionId: questionId },
      order: [["createdAt", "ASC"]],
    });
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

module.exports = DoubtClearQuestionAnswerRepository;
