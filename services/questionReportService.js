// services/questionReportService.js
const QuestionReportRepository = require("../repositories/questionReportRepository");
const db = require("../models");

class QuestionReportService {
  constructor() {
    this.questionReportRepository = new QuestionReportRepository(
      db.QuestionReport
    );
  }

  async create(data) {
    // Validate required fields
    if (!data.question_id) throw new Error("Question ID is required");
    if (!data.report) throw new Error("Report description is required");
    if (!data.subject_id) throw new Error("Subject ID is required");
    if (!data.reported_by) throw new Error("Reported by user ID is required");

    return await this.questionReportRepository.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const {
      question_id,
      subject_id,
      chapter_id,
      topic_id,
      status,
      reported_by,
      course_id,
      search,
    } = query;

    const where = {};

    if (question_id) where.question_id = parseInt(question_id);
    if (subject_id) where.subject_id = parseInt(subject_id);
    if (chapter_id) where.chapter_id = parseInt(chapter_id);
    if (topic_id) where.topic_id = parseInt(topic_id);
    if (status) where.status = status;
    if (reported_by) where.reported_by = parseInt(reported_by);
    if (course_id) where.course_id = parseInt(course_id);

    if (search) {
      where.report = { [db.Sequelize.Op.like]: `%${search}%` };
    }

    return await this.questionReportRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.questionReportRepository.findById(id);
  }

  async accept(id, updatedBy) {
    const questionReport = await this.questionReportRepository.findById(id);
    if (!questionReport) throw new Error("Question report not found");

    return await this.questionReportRepository.update(id, {
      status: "accepted",
      updated_by: updatedBy,
    });
  }

  async decline(id, updatedBy) {
    const questionReport = await this.questionReportRepository.findById(id);
    if (!questionReport) throw new Error("Question report not found");

    return await this.questionReportRepository.update(id, {
      status: "declined",
      updated_by: updatedBy,
    });
  }

  async delete(id) {
    const questionReport = await this.questionReportRepository.delete(id);
    if (!questionReport) throw new Error("Question report not found");
    return questionReport;
  }

  async getByStatus(status, query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    if (query.subject_id) where.subject_id = parseInt(query.subject_id);
    if (query.reported_by) where.reported_by = parseInt(query.reported_by);

    return await this.questionReportRepository.findByStatus(
      status,
      where,
      offset,
      limit
    );
  }
}

module.exports = QuestionReportService;
