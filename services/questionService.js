// services/questionService.js
const QuestionRepository = require("../repositories/questionRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class QuestionService {
  constructor() {
    this.questionRepository = new QuestionRepository(db.Question);
  }

  async create(data) {
    const subject = await db.Subject.findByPk(data.subject_id);
    if (!subject) throw new Error("Subject not found");

    if (data.chapter_id) {
      const chapter = await db.Chapter.findByPk(data.chapter_id);
      if (!chapter) throw new Error("Chapter not found");
    }
    if (data.topic_id) {
      const topic = await db.Topic.findByPk(data.topic_id);
      if (!topic) throw new Error("Topic not found");
    }

    return await this.questionRepository.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const {
      subject_id,
      chapter_id,
      topic_id,
      book_ref_id,
      is_draft,
      is_published,
      search,
    } = query;
    const where = {};

    if (subject_id) where.subject_id = subject_id;
    if (chapter_id) where.chapter_id = chapter_id;
    if (topic_id) where.topic_id = topic_id;
    if (book_ref_id) where.book_ref_id = book_ref_id;
    if (is_draft !== undefined) where.is_draft = is_draft === "true";
    if (is_published !== undefined)
      where.is_published = is_published === "true";

    if (search) {
      where[db.Sequelize.Op.or] = [
        { question: { [db.Sequelize.Op.like]: `%${search}%` } },
        { answer: { [db.Sequelize.Op.like]: `%${search}%` } },
        { des: { [db.Sequelize.Op.like]: `%${search}%` } },
      ];
    }

    return await this.questionRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.questionRepository.findById(id);
  }

  async getBySubject(subjectId, query) {
    return await this._getByFilter({ subject_id: subjectId }, query);
  }

  async getBySubjectAndChapter(subjectId, chapterId, query) {
    return await this._getByFilter(
      { subject_id: subjectId, chapter_id: chapterId },
      query
    );
  }

  async getBySubjectChapterTopic(subjectId, chapterId, topicId, query) {
    return await this._getByFilter(
      { subject_id: subjectId, chapter_id: chapterId, topic_id: topicId },
      query
    );
  }

  async getByTopicBookRef(topicId, bookRefId, query) {
    return await this._getByFilter(
      { topic_id: topicId, book_ref_id: bookRefId },
      query
    );
  }

  async _getByFilter(where, query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    return await this.questionRepository.findByFilters(where, offset, limit);
  }

  async update(id, data) {
    const question = await this.questionRepository.findById(id);
    if (!question) throw new Error("Question not found");

    if (data.subject_id) {
      const subject = await db.Subject.findByPk(data.subject_id);
      if (!subject) throw new Error("Subject not found");
    }
    if (data.chapter_id) {
      const chapter = await db.Chapter.findByPk(data.chapter_id);
      if (!chapter) throw new Error("Chapter not found");
    }

    if (data.image && question.image) {
      await deleteImage(question.image);
    }

    return await question.update(data);
  }

  async delete(id) {
    const question = await this.questionRepository.findById(id);
    if (!question) throw new Error("Question not found");

    if (question.image) {
      await deleteImage(question.image);
    }

    await question.destroy();
    return question;
  }
}

module.exports = QuestionService;
