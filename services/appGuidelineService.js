// services/AppGuidelineService.js
const AppGuidelineRepository = require("../repositories/appGuidelineRepository");
const db = require("../models");

class AppGuidelineService {
  constructor() {
    this.repo = new AppGuidelineRepository(db.AppGuideline);
  }

  async getAll(query) {
    return await this.repo.findAll(query);
  }

  async getById(id) {
    return await this.repo.findById(id);
  }

  async create(data) {
    return await this.repo.create(data);
  }

  async update(id, data) {
    return await this.repo.update(id, data);
  }

  async delete(id) {
    return await this.repo.delete(id);
  }
}

module.exports = AppGuidelineService;
