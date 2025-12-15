class TopicRepository {
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
      order: [["serial_id", "ASC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const topic = await this.model.findByPk(id);
    if (!topic) return null;
    return await topic.update(data);
  }

  async delete(id) {
    const topic = await this.model.findByPk(id);
    if (!topic) return null;
    await topic.destroy();
    return topic;
  }
}

module.exports = TopicRepository;
