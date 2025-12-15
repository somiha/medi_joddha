// controllers/questionController.js
const { uploadImage } = require("../middleware/upload");

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
    this.getByTopicBookRef = this.getByTopicBookRef.bind(this);
    this.getRandomQuestions = this.getRandomQuestions.bind(this);
  }

  async create(req, res) {
    try {
      const {
        subject_id,
        chapter_id,
        topic_id,
        book_ref_id,
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

      const data = {
        subject_id,
        chapter_id,
        topic_id,
        book_ref_id,
        question,
        answer,
        des,
        option1,
        option2,
        option3,
        option4,
        option5,
      };

      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      // ✅ Handle multiple uploaded files
      const baseUrl = process.env.BASE_URL || "http://localhost:5000";

      if (req.files && Array.isArray(req.files)) {
        const folder = req.body.uploadFolder || "questions";

        // Map form field names to database fields
        const imageFieldMap = {
          question_image: "question_image",
          answer_image: "answer_image",
          des_image: "des_image",
          option1_image: "option1_image",
          option2_image: "option2_image",
          option3_image: "option3_image",
          option4_image: "option4_image",
          option5_image: "option5_image",
        };

        req.files.forEach((file) => {
          const fieldName = file.fieldname; // e.g., 'question_image'
          const dbField = imageFieldMap[fieldName];

          if (dbField) {
            const filename = `${folder}/${file.filename}`;
            const imagePath = `${baseUrl}/uploads/${filename}`;
            data[dbField] = imagePath;
          }
        });
      }

      console.log("Data to create:", data);
      const questionObj = await this.questionService.create(data);

      res.status(201).json({
        message: "Question created successfully",
        question: questionObj,
      });
    } catch (error) {
      console.error("Error creating question:", error);
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
        book_ref_id,
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
      if (book_ref_id) data.book_ref_id = book_ref_id;
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

      const baseUrl = process.env.BASE_URL || "http://localhost:5000";

      // ✅ Handle multiple image uploads
      if (req.files && Array.isArray(req.files)) {
        const folder = req.body.uploadFolder || "questions";

        const imageFieldMap = {
          question_image: "question_image",
          answer_image: "answer_image",
          des_image: "des_image",
          option1_image: "option1_image",
          option2_image: "option2_image",
          option3_image: "option3_image",
          option4_image: "option4_image",
          option5_image: "option5_image",
        };

        req.files.forEach((file) => {
          const dbField = imageFieldMap[file.fieldname];
          if (dbField) {
            const filename = `${folder}/${file.filename}`;
            const imagePath = `${baseUrl}/uploads/${filename}`;
            data[dbField] = imagePath;
          }
        });
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

  async getByTopicBookRef(req, res) {
    try {
      const { topicId, bookRefId } = req.params;
      const result = await this.questionService.getByTopicBookRef(
        topicId,
        bookRefId,
        req.query
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "No questions found for this topic and book reference",
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

  async getRandomQuestions(req, res) {
    try {
      const {
        subject_id: subjectId,
        chapter_id: chapterId,
        topic_id: topicId,
        is_board: isBoardStr,
        total: totalStr,
        board_id: boardId, // ✅ Added board_id
      } = req.query;

      console.log("Received parameters:", {
        subjectId,
        chapterId,
        topicId,
        isBoard: isBoardStr,
        total: totalStr,
        boardId, // ✅ Log boardId
      });

      console.log("Received query parameters:", req.query);

      const isBoard = isBoardStr === "1" || isBoardStr === "true";
      const total = totalStr;

      const questions = await this.questionService.getRandomQuestions({
        subjectId,
        chapterId,
        topicId,
        isBoard,
        total,
        boardId, // ✅ Pass boardId
      });

      return res.json({
        success: true,
        count: questions.length,
        questions,
      });
    } catch (error) {
      console.error("Error fetching random questions:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch questions",
        error: error.message,
      });
    }
  }
}

module.exports = QuestionController;
