// repositories/questionReportRepository.js
const { deleteImage } = require("../utils/fileHelper");

class QuestionReportRepository {
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

  async update(id, data) {
    const questionReport = await this.model.findByPk(id);
    if (!questionReport) return null;
    return await questionReport.update(data);
  }

  async delete(id) {
    const questionReport = await this.model.findByPk(id);
    if (!questionReport) return null;

    // Delete image file if exists
    if (questionReport.image) {
      await deleteImage(questionReport.image);
    }

    await questionReport.destroy();
    return questionReport;
  }

  async findByStatus(status, where = {}, offset = 0, limit = 10) {
    const finalWhere = { status, ...where };
    return await this.model.findAndCountAll({
      where: finalWhere,
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });
  }
}

module.exports = QuestionReportRepository;
