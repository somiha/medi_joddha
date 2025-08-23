// services/boardService.js
const BoardRepository = require("../repositories/boardRepository");
const db = require("../models");

class BoardService {
  constructor() {
    this.boardRepository = new BoardRepository(db.Board);
  }

  async create(data) {
    return await this.boardRepository.create(data);
  }

  async getAll() {
    return await this.boardRepository.findAll();
  }

  async getById(id) {
    const board = await this.boardRepository.findById(id);
    if (!board) throw new Error("Board not found");
    return board;
  }

  async delete(id) {
    const board = await this.boardRepository.delete(id);
    if (!board) throw new Error("Board not found");
    return board;
  }
}

module.exports = BoardService;
