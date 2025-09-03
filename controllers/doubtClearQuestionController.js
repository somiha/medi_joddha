// controllers/doubtClearQuestionController.js
class DoubtClearQuestionController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByName = this.getByName.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async add(req, res) {
    try {
      const { name, question, programId, userId } = req.body;

      if (!name || !question) {
        return res
          .status(400)
          .json({ error: "Name and question are required" });
      }

      const data = { name, question, programId, userId };
      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const record = await this.service.add(data);

      res.status(201).json({
        message: "Question added successfully",
        data: record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);

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
      const question = await this.service.getById(id);
      res.json({ question });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByName(req, res) {
    try {
      const { name } = req.params;
      const questions = await this.service.getByNam(name);
      res.json({ questions });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, question, image } = req.body;

      const data = {};
      if (name !== undefined) data.name = name;
      if (question !== undefined) data.question = question;
      if (image !== undefined) data.image = image;

      const record = await this.service.update(id, data);

      res.json({
        message: "Question updated successfully",
        data: record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = DoubtClearQuestionController;
