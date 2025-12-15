// controllers/questionReportController.js
const { uploadImage } = require("../middleware/upload");

class QuestionReportController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const {
        question_id,
        report,
        course_id,
        subject_id,
        chapter_id,
        topic_id,
        reported_by,
      } = req.body;

      const baseUrl = process.env.BASE_URL || "http://localhost:5000";
      let imagePath = null;

      if (req.file) {
        imagePath = `${baseUrl}/uploads/question-reports/${req.file.filename}`;
      }

      const data = {
        question_id: parseInt(question_id),
        report,
        course_id: course_id ? parseInt(course_id) : null,
        subject_id: parseInt(subject_id),
        chapter_id: chapter_id ? parseInt(chapter_id) : null,
        topic_id: topic_id ? parseInt(topic_id) : null,
        reported_by: parseInt(reported_by),
        image: imagePath,
        status: "pending",
      };

      const questionReport = await this.service.create(data);

      res.status(201).json({
        message: "Question report created successfully",
        questionReport,
      });
    } catch (error) {
      console.error("Error creating question report:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);
      res.json({
        question_reports: result.rows,
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
      console.error("Error getting question reports:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const questionReport = await this.service.getById(id);

      if (!questionReport) {
        return res.status(404).json({ error: "Question report not found" });
      }

      res.json({ questionReport });
    } catch (error) {
      console.error("Error getting question report:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async accept(req, res) {
    try {
      const { id } = req.params;
      const { updated_by } = req.body;

      if (!updated_by) {
        return res
          .status(400)
          .json({ error: "Updated by user ID is required" });
      }

      const questionReport = await this.service.accept(
        id,
        parseInt(updated_by)
      );

      res.json({
        message: "Question report accepted successfully",
        questionReport,
      });
    } catch (error) {
      console.error("Error accepting question report:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async decline(req, res) {
    try {
      const { id } = req.params;
      const { updated_by } = req.body;

      if (!updated_by) {
        return res
          .status(400)
          .json({ error: "Updated by user ID is required" });
      }

      const questionReport = await this.service.decline(
        id,
        parseInt(updated_by)
      );

      res.json({
        message: "Question report declined successfully",
        questionReport,
      });
    } catch (error) {
      console.error("Error declining question report:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Question report deleted successfully" });
    } catch (error) {
      console.error("Error deleting question report:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = QuestionReportController;
