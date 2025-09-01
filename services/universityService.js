// services/universityService.js
const UniversityRepository = require("../repositories/universityRepository");
const db = require("../models");

class UniversityService {
  constructor() {
    this.universityRepository = new UniversityRepository(db.University);
  }

  async create(data) {
    return await this.universityRepository.create(data);
  }

  async getAll() {
    return await this.universityRepository.findAll();
  }

  async getById(id) {
    const university = await this.universityRepository.findById(id);
    if (!university) throw new Error("University not found");
    return university;
  }

  async delete(id) {
    const university = await this.universityRepository.delete(id);
    if (!university) throw new Error("University not found");
    return university;
  }
}

module.exports = UniversityService;
