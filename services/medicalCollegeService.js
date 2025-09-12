// services/medicalCollegeService.js
const {
  Sequelize: { Op },
} = require("sequelize");
const MedicalCollegeRepository = require("../repositories/medicalCollegeRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class MedicalCollegeService {
  constructor() {
    this.repo = new MedicalCollegeRepository(db.MedicalCollege);
  }

  async add(data) {
    const {
      name,
      short_name,
      description,
      banner_image,
      photos,
      established_year,
      location,
    } = data;

    if (!name || !description) {
      throw new Error("Name and description are required");
    }

    const existing = await this.repo.findById(name);
    if (existing) {
      throw new Error(`Medical college with name "${name}" already exists`);
    }

    return await this.repo.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { search, is_published, established_year } = query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { short_name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (is_published !== undefined)
      where.is_published = is_published === "true";
    if (established_year) where.established_year = established_year;

    return await this.repo.findAll(where, offset, limit);
  }

  async getById(id) {
    const college = await this.repo.findById(id);
    if (!college) throw new Error("Medical college not found");
    return college;
  }

  async update(id, data) {
    const college = await this.repo.findById(id);
    if (!college) throw new Error("Medical college not found");

    if (data.banner_image && college.banner_image) {
      await deleteImage(college.banner_image);
    }
    if (data.photos && Array.isArray(data.photos)) {
      if (college.photos && Array.isArray(college.photos)) {
        for (const photo of college.photos) {
          if (photo.startsWith("/uploads/")) {
            await deleteImage(photo);
          }
        }
      }
    }

    return await college.update(data);
  }

  async delete(id) {
    const college = await this.repo.findById(id);
    if (!college) throw new Error("Medical college not found");

    if (college.banner_image) {
      await deleteImage(college.banner_image);
    }

    if (college.photos && Array.isArray(college.photos)) {
      for (const photo of college.photos) {
        if (photo.startsWith("/uploads/")) {
          await deleteImage(photo);
        }
      }
    }

    await college.destroy();
    return { message: "Medical college deleted successfully" };
  }
}

module.exports = MedicalCollegeService;
