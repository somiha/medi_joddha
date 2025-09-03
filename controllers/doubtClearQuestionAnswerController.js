// controllers/doubtClearQuestionAnswerController.js

class DoubtClearQuestionAnswerController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getByQuestion = this.getByQuestion.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async add(req, res) {
    try {
      let { doubtClearQuestionId, answer } = req.body;
      let image = null;

      // Handle file upload
      if (req.file) {
        image = `doubt-answer/${req.file.filename}`;
      } else if (req.body.image) {
        image = req.body.image;
      }

      if (!doubtClearQuestionId || !answer) {
        return res
          .status(400)
          .json({ error: "Question ID and answer are required" });
      }

      const uploaderId = req.user?.id;
      const isTeacher =
        req.user?.type === "admin" || req.user?.role === "teacher";

      const data = { doubtClearQuestionId, answer, image };
      const record = await this.service.add(data, uploaderId, isTeacher);

      res.status(201).json({
        message: "Answer added successfully",
        record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);
      res.json({
        answers: result.rows,
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

  async getByQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const answers = await this.service.getByQuestionId(questionId);
      res.json({ answers });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      let { answer } = req.body;
      let image = req.body.image;

      if (!answer) {
        return res.status(400).json({ error: "Answer is required" });
      }

      // Handle new image
      if (req.file) {
        image = `doubt-answer/${req.file.filename}`;
      }

      const data = { answer };
      if (image !== undefined) data.image = image;

      const adminId = req.user?.id;
      const record = await this.service.update(id, data, adminId);

      res.json({
        message: "Answer updated successfully",
        record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Answer deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = DoubtClearQuestionAnswerController;
