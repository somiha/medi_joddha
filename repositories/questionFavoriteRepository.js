// repositories/questionFavoriteRepository.js
const db = require("../models"); // Access to db.Question

class QuestionFavoriteRepository {
  constructor(model) {
    this.model = model;
  }

  // Helper: Attach full question object to each favorite
  async _attachQuestionData(favorites) {
    if (!favorites || favorites.length === 0) {
      return favorites;
    }

    // Extract unique question IDs
    const questionIds = [...new Set(favorites.map((f) => f.question_id))];

    // Fetch all related questions in one query
    const questions = await db.Question.findAll({
      where: { id: questionIds },
      attributes: [
        "id",
        "subject_id",
        "chapter_id",
        "topic_id",
        "book_ref_id",
        "question", // your field name
        "answer",
        "des",
        "is_draft",
        "is_published",
        "image", // main question image
        "question_image",
        "des_image",
        "option1",
        "option2",
        "option3",
        "option4",
        "option5",
        "option1_image",
        "option2_image",
        "option3_image",
        "option4_image",
        "option5_image",
      ],
    });

    // Create a map: question_id → question object
    const questionMap = new Map();
    questions.forEach((q) => {
      questionMap.set(q.id, q.toJSON());
    });

    // Attach question to each favorite
    return favorites.map((fav) => {
      const plainFav = fav.toJSON ? fav.toJSON() : fav;
      return {
        ...plainFav,
        question: questionMap.get(plainFav.question_id) || null,
      };
    });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(where = {}, offset = 0, limit = 10) {
    const result = await this.model.findAndCountAll({
      where,
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });

    // Enrich rows with question data
    const enrichedRows = await this._attachQuestionData(result.rows);

    return {
      ...result,
      rows: enrichedRows,
    };
  }

  async findById(id) {
    const favorite = await this.model.findByPk(id);
    if (!favorite) return null;

    const enriched = await this._attachQuestionData([favorite]);
    return enriched[0];
  }

  async delete(id) {
    const favorite = await this.model.findByPk(id);
    if (!favorite) return null;
    await favorite.destroy();
    return favorite;
  }

  async deleteByUserAndQuestion(userId, questionId) {
    const favorite = await this.model.findOne({
      where: { user_id: userId, question_id: questionId },
    });
    if (!favorite) return null;
    await favorite.destroy();
    return favorite;
  }

  async findByUser(userId, where = {}, offset = 0, limit = 10) {
    const finalWhere = { user_id: userId, ...where };
    const result = await this.model.findAndCountAll({
      where: finalWhere,
      offset,
      limit,
      order: [["created_at", "DESC"]],
    });

    const enrichedRows = await this._attachQuestionData(result.rows);
    return {
      ...result,
      rows: enrichedRows,
    };
  }

  async checkIfFavorite(userId, questionId) {
    const count = await this.model.count({
      where: { user_id: userId, question_id: questionId },
    });
    return count > 0;
  }
}

module.exports = QuestionFavoriteRepository;
