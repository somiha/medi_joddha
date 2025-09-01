// services/test_typeService.js
const TestTypeRepository = require("../repositories/testTypeRepository");
const db = require("../models");

class TestTypeService {
  constructor() {
    this.test_typeRepository = new TestTypeRepository(db.TestType);
  }

  async create(data) {
    return await this.test_typeRepository.create(data);
  }

  async getAll() {
    return await this.test_typeRepository.findAll();
  }

  async getById(id) {
    const test_type = await this.test_typeRepository.findById(id);
    if (!test_type) throw new Error("TestType not found");
    return test_type;
  }

  async delete(id) {
    const test_type = await this.test_typeRepository.delete(id);
    if (!test_type) throw new Error("TestType not found");
    return test_type;
  }
}

module.exports = TestTypeService;
