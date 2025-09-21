// services/bookRefService.js
const BookRefRepository = require("../repositories/bookRefRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class BookRefService {
  constructor() {
    this.repo = new BookRefRepository(db.BookRef);
  }

  async add(data) {
    const { subject_id, name } = data;

    if (!subject_id || !name) {
      throw new Error("Subject ID and name are required");
    }

    // Validate subject exists
    const subject = await db.Subject.findByPk(subject_id);
    if (!subject) throw new Error("Subject not found");

    return await this.repo.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { search, subject_id } = query;
    const where = {};

    if (subject_id) where.subject_id = subject_id;

    if (search) {
      where.name = { [db.Sequelize.Op.like]: `%${search}%` };
    }

    return await this.repo.findAll(where, offset, limit);
  }

  async getById(id) {
    const book = await this.repo.findById(id);
    if (!book) throw new Error("Reference book not found");
    return book;
  }

  async getBySubjectId(subject_id) {
    const books = await this.repo.findBySubjectId(subject_id);
    if (books.length === 0) throw new Error("No books found for this subject");
    return books;
  }

  async update(id, data) {
    const book = await this.repo.findById(id);
    if (!book) throw new Error("Reference book not found");

    // Delete old image if new one uploaded
    if (data.image && book.image) {
      await deleteImage(book.image);
    }

    return await book.update(data);
  }

  async delete(id) {
    const book = await this.repo.findById(id);
    if (!book) throw new Error("Reference book not found");

    if (book.image) {
      await deleteImage(book.image);
    }

    await book.destroy();
    return { message: "Reference book deleted successfully" };
  }
}

module.exports = BookRefService;
