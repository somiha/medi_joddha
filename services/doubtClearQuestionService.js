// services/doubtClearQuestionService.js
const {
  Sequelize: { Op },
} = require("sequelize");
const DoubtClearQuestionRepository = require("../repositories/doubtClearQuestionRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class DoubtClearQuestionService {
  constructor() {
    this.repo = new DoubtClearQuestionRepository(db.DoubtClearQuestion);
  }

  async add(data) {
    return await this.repo.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { name, search } = query;
    const where = {};

    // Filter by name (exact match)
    if (name) {
      where.name = { [Op.eq]: name };
    }

    // Full text search across fields
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { question: { [Op.like]: `%${search}%` } },
      ];
    }

    return await this.repo.findAll(where, offset, limit);
  }

  async getById(id) {
    const question = await this.repo.findById(id);
    if (!question) throw new Error("Doubt Clear Question not found");
    return question;
  }

  async update(id, data) {
    const question = await this.repo.findById(id);
    if (!question) throw new Error("Doubt Clear Question not found");

    // Delete old image if new one is uploaded
    if (data.image && question.image) {
      await deleteImage(question.image);
    }

    return await question.update(data);
  }

  async delete(id) {
    const question = await this.repo.findById(id);
    if (!question) throw new Error("Doubt Clear Question not found");

    // Delete image file if exists
    if (question.image) {
      await deleteImage(question.image);
    }

    await question.destroy();
    return { message: "Question deleted successfully" };
  }
}

module.exports = DoubtClearQuestionService;
