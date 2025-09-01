// services/universityQuestionService.js
const UniversityQuestionRepository = require("../repositories/universityQuestionRepository");
const db = require("../models");

class UniversityQuestionService {
  constructor() {
    this.repo = new UniversityQuestionRepository(db.UniversityQuestion);
  }

  async create(data) {
    const { university_id, question_id, year } = data;

    const university = await db.University.findByPk(university_id);
    if (!university) throw new Error("University not found");

    const question = await db.Question.findByPk(question_id);
    if (!question) throw new Error("Question not found");

    return await this.repo.create({ university_id, question_id, year });
  }

  async createBulk(data) {
    const { university_id, question_id, years } = data;

    const university = await db.University.findByPk(university_id);
    if (!university) throw new Error("University not found");

    const yearArray = Array.isArray(years) ? years : [years];

    const isMatrix = Array.isArray(question_id[0]);
    const questionGroups = isMatrix
      ? question_id
      : yearArray.map(() => question_id);

    if (questionGroups.length !== yearArray.length) {
      throw new Error(
        `Expected ${yearArray.length} question groups, but got ${questionGroups.length}`
      );
    }

    const records = [];

    for (let i = 0; i < yearArray.length; i++) {
      const year = yearArray[i];
      const qIds = questionGroups[i];

      if (!Array.isArray(qIds)) {
        throw new Error(`Question group for year ${year} must be an array`);
      }

      for (const qId of qIds) {
        const question = await db.Question.findByPk(qId);
        if (!question) throw new Error(`Question not found: ID ${qId}`);

        const exists = await this.repo.exists(university_id, qId, year);
        if (exists) continue;

        const record = await this.repo.create({
          university_id,
          question_id: qId,
          year,
        });

        records.push(record);
      }
    }

    return records;
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Mapping not found");
    return record;
  }

  async getByUniversityId(universityId) {
    return await this.repo.findByUniversityId(universityId);
  }

  async getBySubjectAndChapter(subjectId, chapterId) {
    return await this.repo.findBySubjectAndChapter(subjectId, chapterId);
  }

  async update(id, data) {
    const { university_id, question_id, year } = data;

    if (university_id) {
      const university = await db.University.findByPk(university_id);
      if (!university) throw new Error("University not found");
    }

    if (question_id) {
      const question = await db.Question.findByPk(question_id);
      if (!question) throw new Error("Question not found");
    }

    const record = await this.repo.update(id, {
      university_id,
      question_id,
      year,
    });
    if (!record) throw new Error("Record not found");
    return record;
  }

  async delete(id) {
    const record = await this.repo.delete(id);
    if (!record) throw new Error("Record not found");
    return record;
  }
}

module.exports = UniversityQuestionService;
