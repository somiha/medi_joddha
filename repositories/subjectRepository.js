// repositories/subjectRepository.js
class SubjectRepository {
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
      order: [["id", "ASC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const subject = await this.model.findByPk(id);
    if (!subject) return null;
    return await subject.update(data);
  }

  async delete(id) {
    const subject = await this.model.findByPk(id);
    if (!subject) return null;
    await subject.destroy();
    return subject;
  }
}

module.exports = SubjectRepository;
