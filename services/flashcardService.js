// services/flashcardService.js
const FlashcardRepository = require("../repositories/flashcardRepository");
const db = require("../models");

class FlashcardService {
  constructor() {
    this.repo = new FlashcardRepository(db.ModelTestQuestion);
  }

  async getAll(filters = {}) {
    return await this.repo.findAll(filters);
  }

  async getById(id) {
    const flashcard = await this.repo.findById(id);
    if (!flashcard) throw new Error("Flashcard not found");
    return flashcard;
  }
}

module.exports = FlashcardService;
