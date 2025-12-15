// repositories/chapterRepository.js
class ChapterRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  // async findAll(where = {}, offset = 0, limit = 10) {
  //   return await this.model.findAndCountAll({
  //     where,
  //     offset,
  //     limit,
  //     order: [["serial_id", "ASC"]],
  //   });
  // }

  // repositories/ChapterRepository.js
  async findAll(where = {}, offset = 0, limit = 10) {
    // Default order: prioritize subject grouping first, then serial_id, then id for stability
    const order = [
      ["subject_id", "ASC"], // Group all chapters by subject
      ["serial_id", "ASC"], // Then sort by serial_id within each subject
      ["id", "ASC"], // Final tie-breaker for consistent pagination
    ];

    return await this.model.findAndCountAll({
      where,
      offset,
      limit,
      order,
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
