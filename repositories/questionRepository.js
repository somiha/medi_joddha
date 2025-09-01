// repositories/questionRepository.js
class QuestionRepository {
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
    const question = await this.model.findByPk(id);
    if (!question) return null;
    return await question.update(data);
  }

  async delete(id) {
    const question = await this.model.findByPk(id);
    if (!question) return null;
    await question.destroy();
    return question;
  }

  async findByFilters(filters, offset = 0, limit = 10) {
    return await this.model.findAndCountAll({
      where: filters,
      offset,
      limit,
      order: [["id", "DESC"]],
    });
  }

  async findByIds(ids) {
    return await this.model.findAll({
      where: { id: ids },
    });
  }
}

module.exports = QuestionRepository;
