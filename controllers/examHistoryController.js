// controllers/examHistoryController.js
class ExamHistoryController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
    this.getStatistics = this.getStatistics.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const {
        user_id,
        subject_id,
        chapter_id,
        topic_id,
        is_board = false,
        total_time_taken,
        question_answers,
      } = req.body;

      // Validate question_answers structure
      if (!Array.isArray(question_answers)) {
        return res.status(400).json({
          success: false,
          message: "question_answers must be an array",
        });
      }

      // Validate each question answer
      for (const qa of question_answers) {
        if (!qa.question_id || qa.user_answer === undefined) {
          return res.status(400).json({
            success: false,
            message:
              "Each question answer must have question_id and user_answer",
          });
        }
      }

      const data = {
        user_id: parseInt(user_id),
        subject_id: parseInt(subject_id),
        chapter_id: chapter_id ? parseInt(chapter_id) : null,
        topic_id: topic_id ? parseInt(topic_id) : null,
        is_board: is_board === true || is_board === "true",
        total_time_taken: parseInt(total_time_taken),
        question_answers: question_answers,
      };

      const examHistory = await this.service.create(data);

      res.status(201).json({
        success: true,
        message: "Exam history saved successfully",
        data: examHistory,
      });
    } catch (error) {
      console.error("Error creating exam history:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Failed to save exam history",
      });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);

      res.json({
        success: true,
        data: {
          exam_histories: result.rows,
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
        },
      });
    } catch (error) {
      console.error("Error getting exam histories:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get exam histories",
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const examHistory = await this.service.getById(id);

      if (!examHistory) {
        return res.status(404).json({
          success: false,
          message: "Exam history not found",
        });
      }

      res.json({
        success: true,
        data: examHistory,
      });
    } catch (error) {
      console.error("Error getting exam history:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get exam history",
      });
    }
  }

  async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      const result = await this.service.getByUserId(
        parseInt(userId),
        req.query
      );

      res.json({
        success: true,
        data: {
          exam_histories: result.rows,
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
        },
      });
    } catch (error) {
      console.error("Error getting user exam histories:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get user exam histories",
      });
    }
  }

  async getStatistics(req, res) {
    try {
      const { userId } = req.params;
      const { subject_id, chapter_id } = req.query;

      const statistics = await this.service.getStatistics(
        parseInt(userId),
        subject_id ? parseInt(subject_id) : null,
        chapter_id ? parseInt(chapter_id) : null
      );

      res.json({
        success: true,
        data: statistics,
      });
    } catch (error) {
      console.error("Error getting statistics:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to get statistics",
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);

      res.json({
        success: true,
        message: "Exam history deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting exam history:", error);
      res.status(400).json({
        success: false,
        message: error.message || "Failed to delete exam history",
      });
    }
  }
}

module.exports = ExamHistoryController;
