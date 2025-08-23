// services/subjectService.js
const { Op } = require("sequelize");
const SubjectRepository = require("../repositories/subjectRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class SubjectService {
  constructor() {
    this.subjectRepository = new SubjectRepository(db.Subject);
  }

  async create(data) {
    return await this.subjectRepository.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { is_draft, is_published, search } = query;
    const where = {};

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

    return await this.subjectRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.subjectRepository.findById(id);
  }

  async update(id, data) {
    const subject = await this.subjectRepository.findById(id);
    if (!subject) throw new Error("Subject not found");

    if (data.image && subject.image) {
      await deleteImage(subject.image);
    }

    return await subject.update(data);
  }

  async delete(id) {
    const subject = await this.subjectRepository.findById(id);
    if (!subject) throw new Error("Subject not found");

    if (subject.image) {
      await deleteImage(subject.image);
    }

    await subject.destroy();
    return subject;
  }
}

module.exports = SubjectService;
