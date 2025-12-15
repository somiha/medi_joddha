// services/liveTestResultService.js
const LiveTestResultRepository = require("../repositories/liveTestResultRepository");
const db = require("../models");

class LiveTestResultService {
  constructor() {
    this.repo = new LiveTestResultRepository(db.LiveTestResult);
  }

  async add(data) {
    const { user_id, test_id } = data;

    if (!user_id || !test_id) {
      throw new Error("User ID and Test ID are required");
    }

    const user = await db.User.findByPk(user_id);
    if (!user) throw new Error("User not found");

    const test =
      (await db.ModelTest?.findByPk(test_id)) ||
      (await db.SomeTestModel?.findByPk(test_id));

    if (!test) throw new Error("Test not found");

    const existing = await this.repo.findByUserAndTestId(user_id, test_id);
    if (existing) {
      throw new Error("User has already taken this test");
    }

    return await this.repo.create(data);
  }

  async getByUserId(user_id) {
    const records = await this.repo.findByUserId(user_id);
    if (records.length === 0) {
      throw new Error("No live tests found for this user");
    }
    return records;
  }

  async getByTestId(test_id) {
    const records = await this.repo.findByTestId(test_id);
    if (records.length === 0) {
      throw new Error("No users found who took this test");
    }
    return records;
  }

  async getById(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Live test record not found");
    return record;
  }

  async update(id, data) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Record not found");

    return await record.update(data);
  }

  async delete(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Record not found");

    await record.destroy();
    return { message: "Live test submission deleted successfully" };
  }

  async getTodaysTests() {
    const todaysTest = await this.repo.getTodaysTests();
    if (todaysTest.length === 0) {
      throw new Error("No tests scheduled for today");
    }
    return todaysTest;
  }

  async getRankingByTestId(testId) {
    if (!testId) throw new Error("Test ID is required");

    const ranking = await this.repo.getRankingByTestId(testId);
    if (ranking.length === 0) {
      throw new Error("No results found for this test");
    }

    return ranking;
  }
}

module.exports = LiveTestResultService;
