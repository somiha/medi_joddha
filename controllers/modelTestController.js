// controllers/modelTestController.js
class ModelTestController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByIdWithTypeName = this.getByIdWithTypeName.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const {
        title,
        year,
        subject_id,
        type_id,
        start_time,
        end_time,
        total_rankings,
        is_published,
        is_archived,
      } = req.body;

      if (!title || !year || !type_id) {
        return res.status(400).json({
          error: "Title, year, and type_id are required",
        });
      }

      const data = { title, year, type_id };
      if (subject_id) data.subject_id = subject_id;

      if (is_published !== undefined) data.is_published = is_published;
      if (is_archived !== undefined) data.is_archived = is_archived;
      if (start_time) data.start_time = start_time;
      if (end_time) data.end_time = end_time;
      if (total_rankings) data.total_rankings = total_rankings;

      const test = await this.service.create(data);

      res.status(201).json({
        message: "Model Test created successfully",
        test,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);

      res.json({
        model_tests: result.rows,
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
      const test = await this.service.getById(id);
      res.json({ test });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByIdWithTypeName(req, res) {
    try {
      const { id } = req.params;
      const test = await this.service.getByIdWithTypeName(id);
      res.json({ test });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        year,
        subject_id,
        type_id,
        is_published,
        is_archived,
        start_time,
        end_time,
        total_rankings,
      } = req.body;

      const data = {};
      if (title) data.title = title;
      if (year) data.year = year;
      if (subject_id !== undefined) data.subject_id = subject_id;
      if (type_id !== undefined) data.type_id = type_id;
      if (is_published !== undefined) data.is_published = is_published;
      if (is_archived !== undefined) data.is_archived = is_archived;
      if (start_time) data.start_time = start_time;
      if (end_time) data.end_time = end_time;
      if (total_rankings) data.total_rankings = total_rankings;

      const test = await this.service.update(id, data);

      res.json({
        message: "Model Test updated successfully",
        test,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Model Test deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ModelTestController;
