// repositories/examHistoryRepository.js
class ExamHistoryRepository {
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
      order: [["created_at", "DESC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findByUserId(userId, where = {}, offset = 0, limit = 10) {
    const finalWhere = { user_id: userId, ...where };
    return await this.model.findAndCountAll({
      where: finalWhere,
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return record;
  }

  async getStatistics(userId, subjectId = null, chapterId = null) {
    const where = { user_id: userId };
    if (subjectId) where.subject_id = subjectId;
    if (chapterId) where.chapter_id = chapterId;

    const histories = await this.model.findAll({
      where,
      attributes: [
        "subject_id",
        "chapter_id",
        "num_of_correct",
        "num_of_attempt",
        "num_of_wrong",
        "total_time_taken",
        "created_at",
      ],
    });

    return histories;
  }
}

module.exports = ExamHistoryRepository;
