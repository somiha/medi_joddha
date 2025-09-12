// services/admissionNoticeService.js
const {
  Sequelize: { Op },
} = require("sequelize");
const AdmissionNoticeRepository = require("../repositories/admissionNoticeRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class AdmissionNoticeService {
  constructor() {
    this.repo = new AdmissionNoticeRepository(db.AdmissionNotice);
  }

  async add(data) {
    const { title, description, year } = data;

    if (!title || !description || !year) {
      throw new Error("Title, description, and year are required");
    }
    const existing = await this.repo.findById(year);
    if (existing) {
      throw new Error(`Admission notice for year ${year} already exists`);
    }

    return await this.repo.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { year, search, is_published } = query;
    const where = {};

    if (year) where.year = year;
    if (is_published !== undefined)
      where.is_published = is_published === "true";

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    return await this.repo.findAll(where, offset, limit);
  }

  async getById(id) {
    const notice = await this.repo.findById(id);
    if (!notice) throw new Error("Admission notice not found");
    return notice;
  }

  async update(id, data) {
    const notice = await this.repo.findById(id);
    if (!notice) throw new Error("Admission notice not found");

    // Delete old image if new one uploaded
    if (data.image && notice.image) {
      await deleteImage(notice.image);
    }

    return await notice.update(data);
  }

  async delete(id) {
    const notice = await this.repo.findById(id);
    if (!notice) throw new Error("Admission notice not found");

    if (notice.image) {
      await deleteImage(notice.image);
    }

    await notice.destroy();
    return { message: "Admission notice deleted successfully" };
  }
}

module.exports = AdmissionNoticeService;
