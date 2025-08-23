// services/programService.js
const {
  Sequelize: { Op },
} = require("sequelize");
const ProgramRepository = require("../repositories/programRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class ProgramService {
  constructor() {
    this.programRepository = new ProgramRepository(db.Program);
  }

  async create(data) {
    return await this.programRepository.create(data);
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

    return await this.programRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.programRepository.findById(id);
  }

  async update(id, data) {
    const program = await this.programRepository.findById(id);
    if (!program) return null;

    if (data.image && program.image) {
      await deleteImage(program.image);
    }

    return await program.update(data);
  }

  async delete(id) {
    const program = await this.programRepository.findById(id);
    if (!program) return null;
    if (program.image) {
      await deleteImage(program.image);
    }

    await program.destroy();
    return program;
  }
}

module.exports = ProgramService;
