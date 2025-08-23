// services/chapterService.js
const { Op } = require("sequelize");
const ChapterRepository = require("../repositories/chapterRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class ChapterService {
  constructor() {
    this.chapterRepository = new ChapterRepository(db.Chapter);
  }

  async create(data) {
    const subject = await db.Subject.findByPk(data.subject_id);
    if (!subject) throw new Error("Subject not found");

    return await this.chapterRepository.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { subject_id, is_draft, is_published, search } = query;
    const where = {};

    if (subject_id) where.subject_id = subject_id;
    if (is_draft !== undefined) where.is_draft = is_draft === "true";
    if (is_published !== undefined)
      where.is_published = is_published === "true";

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { title: { [Op.like]: `%${search}%` } },
        { short_des: { [Op.like]: `%${search}%` } },
      ];
    }

    return await this.chapterRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.chapterRepository.findById(id);
  }

  async update(id, data) {
    const chapter = await this.chapterRepository.findById(id);
    if (!chapter) throw new Error("Chapter not found");

    if (data.subject_id) {
      const subject = await db.Subject.findByPk(data.subject_id);
      if (!subject) throw new Error("Subject not found");
    }

    if (data.image && chapter.image) {
      await deleteImage(chapter.image);
    }

    return await chapter.update(data);
  }

  async delete(id) {
    const chapter = await this.chapterRepository.findById(id);
    if (!chapter) throw new Error("Chapter not found");

    if (chapter.image) {
      await deleteImage(chapter.image);
    }

    await chapter.destroy();
    return chapter;
  }
}

module.exports = ChapterService;
