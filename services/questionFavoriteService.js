// services/questionFavoriteService.js
const QuestionFavoriteRepository = require("../repositories/questionFavoriteRepository");
const db = require("../models");

class QuestionFavoriteService {
  constructor() {
    this.questionFavoriteRepository = new QuestionFavoriteRepository(
      db.QuestionFavorite
    );
  }

  async create(data) {
    // Validate required fields
    if (!data.user_id) throw new Error("User ID is required");
    if (!data.question_id) throw new Error("Question ID is required");
    if (!data.subject_id) throw new Error("Subject ID is required");

    // Check if question exists
    const question = await db.Question.findByPk(data.question_id);
    if (!question) throw new Error("Question not found");

    // Check if already favorited
    const existing = await this.questionFavoriteRepository.checkIfFavorite(
      data.user_id,
      data.question_id
    );

    if (existing) {
      throw new Error("Question already in favorites");
    }

    return await this.questionFavoriteRepository.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { user_id, question_id, subject_id, course_id, chapter_id } = query;

    const where = {};

    if (user_id) where.user_id = parseInt(user_id);
    if (question_id) where.question_id = parseInt(question_id);
    if (subject_id) where.subject_id = parseInt(subject_id);
    if (course_id) where.course_id = parseInt(course_id);
    if (chapter_id) where.chapter_id = parseInt(chapter_id);

    return await this.questionFavoriteRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.questionFavoriteRepository.findById(id);
  }

  async delete(id) {
    const favorite = await this.questionFavoriteRepository.delete(id);
    if (!favorite) throw new Error("Favorite not found");
    return favorite;
  }

  async removeFavorite(userId, questionId) {
    const favorite =
      await this.questionFavoriteRepository.deleteByUserAndQuestion(
        parseInt(userId),
        parseInt(questionId)
      );
    if (!favorite) throw new Error("Favorite not found");
    return favorite;
  }

  async getByUser(userId, query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    if (query.subject_id) where.subject_id = parseInt(query.subject_id);
    if (query.course_id) where.course_id = parseInt(query.course_id);
    if (query.chapter_id) where.chapter_id = parseInt(query.chapter_id);

    return await this.questionFavoriteRepository.findByUser(
      parseInt(userId),
      where,
      offset,
      limit
    );
  }

  async checkFavorite(userId, questionId) {
    return await this.questionFavoriteRepository.checkIfFavorite(
      parseInt(userId),
      parseInt(questionId)
    );
  }

  async toggleFavorite(data) {
    const { user_id, question_id } = data;

    // Check if already favorited
    const isFavorite = await this.checkFavorite(user_id, question_id);

    if (isFavorite) {
      // Remove from favorites
      return {
        action: "removed",
        data: await this.removeFavorite(user_id, question_id),
      };
    } else {
      // Add to favorites
      return {
        action: "added",
        data: await this.create(data),
      };
    }
  }
}

module.exports = QuestionFavoriteService;
