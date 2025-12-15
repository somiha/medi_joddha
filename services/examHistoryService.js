// services/examHistoryService.js
const ExamHistoryRepository = require("../repositories/examHistoryRepository");
const db = require("../models");

class ExamHistoryService {
  constructor() {
    this.examHistoryRepository = new ExamHistoryRepository(db.ExamHistory);
  }

  async create(data) {
    // Validate required fields
    if (!data.user_id) throw new Error("User ID is required");
    if (!data.subject_id) throw new Error("Subject ID is required");
    if (!data.question_answers || !Array.isArray(data.question_answers)) {
      throw new Error("Question answers array is required");
    }
    if (!data.total_time_taken) throw new Error("Total time taken is required");

    // Calculate statistics
    const questionAnswers = data.question_answers;
    const numOfAttempt = questionAnswers.length;
    const numOfCorrect = questionAnswers.filter((q) => q.is_correct).length;
    const numOfWrong = numOfAttempt - numOfCorrect;

    // Create exam history record
    const examData = {
      user_id: data.user_id,
      subject_id: data.subject_id,
      chapter_id: data.chapter_id || null,
      topic_id: data.topic_id || null,
      is_board: data.is_board || false,
      total_time_taken: data.total_time_taken,
      question_answers: questionAnswers,
      num_of_correct: numOfCorrect,
      num_of_attempt: numOfAttempt,
      num_of_wrong: numOfWrong,
    };

    return await this.examHistoryRepository.create(examData);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    // Filter by user_id if provided
    if (query.user_id) where.user_id = parseInt(query.user_id);
    if (query.subject_id) where.subject_id = parseInt(query.subject_id);
    if (query.chapter_id) where.chapter_id = parseInt(query.chapter_id);
    if (query.topic_id) where.topic_id = parseInt(query.topic_id);
    if (query.is_board !== undefined)
      where.is_board = query.is_board === "true";

    return await this.examHistoryRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.examHistoryRepository.findById(id);
  }

  async getByUserId(userId, query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    if (query.subject_id) where.subject_id = parseInt(query.subject_id);
    if (query.chapter_id) where.chapter_id = parseInt(query.chapter_id);
    if (query.topic_id) where.topic_id = parseInt(query.topic_id);
    if (query.is_board !== undefined)
      where.is_board = query.is_board === "true";

    return await this.examHistoryRepository.findByUserId(
      userId,
      where,
      offset,
      limit
    );
  }

  async getStatistics(userId, subjectId = null, chapterId = null) {
    return await this.examHistoryRepository.getStatistics(
      userId,
      subjectId,
      chapterId
    );
  }

  async delete(id) {
    const examHistory = await this.examHistoryRepository.findById(id);
    if (!examHistory) throw new Error("Exam history not found");
    return await this.examHistoryRepository.delete(id);
  }
}

module.exports = ExamHistoryService;
