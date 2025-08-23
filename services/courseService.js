// services/courseService.js
const { Op } = require("sequelize");
const CourseRepository = require("../repositories/courseRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository(db.Course);
  }

  async create(data) {
    const program = await db.Program.findByPk(data.program_id);
    if (!program) throw new Error("Program not found");

    return await this.courseRepository.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { program_id, is_draft, is_published, search } = query;
    const where = {};

    if (program_id) where.program_id = program_id;
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

    return await this.courseRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.courseRepository.findById(id);
  }

  async update(id, data) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new Error("Course not found");

    if (data.program_id) {
      const program = await db.Program.findByPk(data.program_id);
      if (!program) throw new Error("Program not found");
    }

    if (data.image && course.image) {
      await deleteImage(course.image);
    }

    return await course.update(data);
  }

  async delete(id) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new Error("Course not found");

    if (course.image) {
      await deleteImage(course.image);
    }

    await course.destroy();
    return course;
  }

  async getCoursesByProgram(programId, query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { is_draft, is_published, search } = query;
    const where = { program_id: programId };

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

    return await this.courseRepository.findAll(where, offset, limit);
  }
}

module.exports = CourseService;
