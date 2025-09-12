// services/doubtClearQuestionAnswerService.js
const {
  Sequelize: { Op },
} = require("sequelize");
const DoubtClearQuestionAnswerRepository = require("../repositories/doubtClearQuestionAnswerRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class DoubtClearQuestionAnswerService {
  constructor() {
    this.repo = new DoubtClearQuestionAnswerRepository(
      db.DoubtClearQuestionAnswer
    );
  }

  async add(data, uploaderId, isTeacher = false) {
    const { doubtClearQuestionId, answer } = data;

    if (!doubtClearQuestionId || !answer) {
      throw new Error("Question ID and answer are required");
    }
    const question = await db.DoubtClearQuestion.findByPk(doubtClearQuestionId);
    if (!question) throw new Error("Doubt clear question not found");

    const userId = isTeacher ? null : uploaderId;
    const teacherId = isTeacher ? uploaderId : null;

    return await this.repo.create({
      doubtClearQuestionId,
      userId,
      teacherId,
      answer,
      image: data.image || null,
    });
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { doubtClearQuestionId, userId, teacherId, search } = query;
    const where = {};

    if (doubtClearQuestionId) where.doubtClearQuestionId = doubtClearQuestionId;
    if (userId) where.userId = userId;
    if (teacherId) where.teacherId = teacherId;

    if (search) {
      where[Op.or] = [
        { answer: { [Op.like]: `%${search}%` } },
        { "$User.full_name$": { [Op.like]: `%${search}%` } },
        { "$Teacher.full_name$": { [Op.like]: `%${search}%` } },
      ];
    }

    return await this.repo.findAll(where, offset, limit);
  }

  async getByQuestionId(questionId) {
    const answers = await this.repo.findByQuestionId(questionId);
    if (answers.length === 0) {
      throw new Error("No answers found for this question");
    }
    return answers;
  }

  async update(id, data, adminId) {
    const answer = await this.repo.findById(id);
    if (!answer) throw new Error("Answer not found");

    // Handle image deletion if new image uploaded
    if (data.image && answer.image) {
      await deleteImage(answer.image);
    }

    const updates = { ...data };
    if (adminId) updates.updatedBy = adminId;

    return await answer.update(updates);
  }

  async delete(id) {
    const answer = await this.repo.findById(id);
    if (!answer) throw new Error("Answer not found");

    if (answer.image) {
      await deleteImage(answer.image);
    }

    await answer.destroy();
    return { message: "Answer deleted successfully" };
  }
}

module.exports = DoubtClearQuestionAnswerService;
