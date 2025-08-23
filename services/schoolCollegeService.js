// services/schoolCollegeService.js
const SchoolCollegeRepository = require("../repositories/schoolCollegeRepository");
const db = require("../models");

class SchoolCollegeService {
  constructor() {
    this.repo = new SchoolCollegeRepository(db.SchoolCollege);
  }

  async create(data) {
    return await this.repo.create(data);
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("School/College not found");
    return record;
  }

  async delete(id) {
    const record = await this.repo.delete(id);
    if (!record) throw new Error("School/College not found");
    return record;
  }
}

module.exports = SchoolCollegeService;
