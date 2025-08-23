// controllers/questionController.js
class QuestionController {
  constructor(questionService) {
    this.questionService = questionService;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getBySubject = this.getBySubject.bind(this);
    this.getBySubjectAndChapter = this.getBySubjectAndChapter.bind(this);
    this.getBySubjectChapterTopic = this.getBySubjectChapterTopic.bind(this);
  }

  async create(req, res) {
    try {
      const {
        subject_id,
        chapter_id,
        topic_id,
        question,
        answer,
        des,
        is_draft,
        is_published,
        option1,
        option2,
        option3,
        option4,
        option5,
      } = req.body;

      const data = { subject_id, chapter_id, topic_id, question, answer, des };
      if (option1) data.option1 = option1;
      if (option2) data.option2 = option2;
      if (option3) data.option3 = option3;
      if (option4) data.option4 = option4;
      if (option5) data.option5 = option5;
      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const questionObj = await this.questionService.create(data);

      res.status(201).json({
        message: "Question created successfully",
        question: questionObj,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.questionService.getAll(req.query);

      res.json({
        questions: result.rows,
        pagination: {
          currentPage: parseInt(req.query.page) || 1,
          totalPages: Math.ceil(
            result.count / (parseInt(req.query.limit) || 10)
          ),
          totalItems: result.count,
          hasNext:
            (parseInt(req.query.page) || 1) *
              (parseInt(req.query.limit) || 10) <
            result.count,
          hasPrev: (parseInt(req.query.page) || 1) > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const question = await this.questionService.getById(id);

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json({ question });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        subject_id,
        chapter_id,
        topic_id,
        question,
        answer,
        des,
        is_draft,
        is_published,
        option1,
        option2,
        option3,
        option4,
        option5,
      } = req.body;

      const data = {};
      if (subject_id) data.subject_id = subject_id;
      if (chapter_id) data.chapter_id = chapter_id;
      if (topic_id) data.topic_id = topic_id;
      if (question) data.question = question;
      if (answer) data.answer = answer;
      if (des) data.des = des;
      if (option1 !== undefined) data.option1 = option1;
      if (option2 !== undefined) data.option2 = option2;
      if (option3 !== undefined) data.option3 = option3;
      if (option4 !== undefined) data.option4 = option4;
      if (option5 !== undefined) data.option5 = option5;
      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const questionObj = await this.questionService.update(id, data);

      res.json({
        message: "Question updated successfully",
        question: questionObj,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.questionService.delete(id);

      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBySubject(req, res) {
    try {
      const { subjectId } = req.params;
      const result = await this.questionService.getBySubject(
        subjectId,
        req.query
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "No questions found for this subject" });
      }

      res.json({
        questions: result.rows,
        pagination: {
          currentPage: parseInt(req.query.page) || 1,
          totalPages: Math.ceil(
            result.count / (parseInt(req.query.limit) || 10)
          ),
          totalItems: result.count,
          hasNext:
            (parseInt(req.query.page) || 1) *
              (parseInt(req.query.limit) || 10) <
            result.count,
          hasPrev: (parseInt(req.query.page) || 1) > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBySubjectAndChapter(req, res) {
    try {
      const { subjectId, chapterId } = req.params;
      const result = await this.questionService.getBySubjectAndChapter(
        subjectId,
        chapterId,
        req.query
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "No questions found for this subject and chapter" });
      }

      res.json({
        questions: result.rows,
        pagination: {
          currentPage: parseInt(req.query.page) || 1,
          totalPages: Math.ceil(
            result.count / (parseInt(req.query.limit) || 10)
          ),
          totalItems: result.count,
          hasNext:
            (parseInt(req.query.page) || 1) *
              (parseInt(req.query.limit) || 10) <
            result.count,
          hasPrev: (parseInt(req.query.page) || 1) > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBySubjectChapterTopic(req, res) {
    try {
      const { subjectId, chapterId, topicId } = req.params;
      const result = await this.questionService.getBySubjectChapterTopic(
        subjectId,
        chapterId,
        topicId,
        req.query
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "No questions found for this subject, chapter, and topic",
        });
      }

      res.json({
        questions: result.rows,
        pagination: {
          currentPage: parseInt(req.query.page) || 1,
          totalPages: Math.ceil(
            result.count / (parseInt(req.query.limit) || 10)
          ),
          totalItems: result.count,
          hasNext:
            (parseInt(req.query.page) || 1) *
              (parseInt(req.query.limit) || 10) <
            result.count,
          hasPrev: (parseInt(req.query.page) || 1) > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = QuestionController;
