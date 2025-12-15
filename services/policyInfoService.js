// services/PolicyInfoService.js
const PolicyInfoRepository = require("../repositories/policyInfoRepository");
const db = require("../models");

class PolicyInfoService {
  constructor() {
    this.repo = new PolicyInfoRepository(db.PolicyInfo);
  }

  async getAll() {
    const records = await this.repo.findAll();
    return records[0] || null; // Return first (only) record
  }

  async getById(id) {
    return await this.repo.findById(id);
  }

  async create(data) {
    const existing = await this.repo.findAll();
    if (existing.length > 0) {
      throw new Error("Policy info already exists. Use update instead.");
    }
    return await this.repo.create(data);
  }

  async update(id, data) {
    return await this.repo.update(id, data);
  }

  async delete(id) {
    return await this.repo.delete(id);
  }
}

module.exports = PolicyInfoService;
