// controllers/bookRefController.js
const { uploadImage } = require("../middleware/upload");

class BookRefController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getBySubjectId = this.getBySubjectId.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async add(req, res) {
    try {
      console.log(req.body);
      const { subject_id, name } = req.body;
      let image = null;

      // Handle file upload
      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        image = `${baseUrl}/uploads/${req.file.filename}`;
      } else if (req.body.image) {
        image = req.body.image;
      }

      if (!subject_id || !name) {
        return res
          .status(400)
          .json({ error: "Subject ID and name are required" });
      }

      const data = { subject_id, name, image };
      if (image) data.image = image;
      const book = await this.service.add(data);

      res.status(201).json({
        message: "Reference book added successfully",
        book,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);
      res.json({
        books: result.rows,
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
      const book = await this.service.getById(id);
      res.json({ book });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getBySubjectId(req, res) {
    try {
      const { subject_id } = req.params;
      const books = await this.service.getBySubjectId(subject_id);
      res.json({ books });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { subject_id, name } = req.body;
      let image = req.body.image;

      if (!subject_id || !name) {
        return res
          .status(400)
          .json({ error: "Subject ID and name are required" });
      }

      // If new file uploaded
      if (req.file) {
        image = `book-ref/${req.file.filename}`;
      }

      const data = { subject_id, name, image };
      const book = await this.service.update(id, data);

      res.json({
        message: "Reference book updated successfully",
        book,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Reference book deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = BookRefController;
