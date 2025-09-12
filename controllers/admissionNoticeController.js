// controllers/admissionNoticeController.js
const { uploadImage } = require("../middleware/upload");

class AdmissionNoticeController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async add(req, res) {
    try {
      console.log(req.body);
      let { title, description, year, is_published } = req.body;
      let image = null;

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        image = `${baseUrl}/uploads/${req.file.filename}`;
      } else if (req.body.image) {
        image = req.body.image;
      }

      const data = { title, description, year, image, is_published };
      if (image) data.image = image;

      const notice = await this.service.add(data);

      res.status(201).json({
        message: "Admission notice added successfully",
        notice,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);
      res.json({
        notices: result.rows,
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
      const notice = await this.service.getById(id);
      res.json({ notice });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      let { title, description, year, is_published } = req.body;
      let image = req.body.image;

      if (!title || !description || !year) {
        return res
          .status(400)
          .json({ error: "Title, description, and year are required" });
      }

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const data = { title, description, year, image, is_published };
      const notice = await this.service.update(id, data);

      res.json({
        message: "Admission notice updated successfully",
        notice,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Admission notice deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AdmissionNoticeController;
