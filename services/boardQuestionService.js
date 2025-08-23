// services/boardQuestionService.js
const BoardQuestionRepository = require("../repositories/boardQuestionRepository");
const db = require("../models");

class BoardQuestionService {
  constructor() {
    this.repo = new BoardQuestionRepository(db.BoardQuestion);
  }

  async create(data) {
    const { board_id, question_id, year } = data;

    const board = await db.Board.findByPk(board_id);
    if (!board) throw new Error("Board not found");

    const question = await db.Question.findByPk(question_id);
    if (!question) throw new Error("Question not found");

    return await this.repo.create({ board_id, question_id, year });
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Mapping not found");
    return record;
  }

  async getByBoardId(boardId) {
    return await this.repo.findByBoardId(boardId);
  }

  async getBySubjectAndChapter(subjectId, chapterId) {
    return await this.repo.findBySubjectAndChapter(subjectId, chapterId);
  }

  async update(id, data) {
    const { board_id, question_id, year } = data;

    if (board_id) {
      const board = await db.Board.findByPk(board_id);
      if (!board) throw new Error("Board not found");
    }

    if (question_id) {
      const question = await db.Question.findByPk(question_id);
      if (!question) throw new Error("Question not found");
    }

    const record = await this.repo.update(id, { board_id, question_id, year });
    if (!record) throw new Error("Record not found");
    return record;
  }

  async delete(id) {
    const record = await this.repo.delete(id);
    if (!record) throw new Error("Record not found");
    return record;
  }
}

module.exports = BoardQuestionService;
