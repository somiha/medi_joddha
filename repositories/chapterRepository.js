// repositories/chapterRepository.js
class ChapterRepository {
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
    const chapter = await this.model.findByPk(id);
    if (!chapter) return null;
    return await chapter.update(data);
  }

  async delete(id) {
    const chapter = await this.model.findByPk(id);
    if (!chapter) return null;
    await chapter.destroy();
    return chapter;
  }
}

module.exports = ChapterRepository;
