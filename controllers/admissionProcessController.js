// controllers/admissionProcessController.js

class AdmissionProcessController {
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
      let { title, description } = req.body;
      let image = null;

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        image = `${baseUrl}/uploads/${req.file.filename}`;
      } else if (req.body.image) {
        image = req.body.image;
      }

      if (!title || !description) {
        return res
          .status(400)
          .json({ error: "Title and description are required" });
      }

      const data = { title, description };
      if (image) data.image = image;

      const record = await this.service.add(data);

      res.status(201).json({
        message: "Admission process added successfully",
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
        admission_processes: result.rows,
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
      const process = await this.service.getById(id);
      res.json({ process });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      let { title, description } = req.body;
      let image = req.body.image;

      if (!title || !description) {
        return res
          .status(400)
          .json({ error: "Title and description are required" });
      }

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const data = { title, description };
      if (image !== undefined) data.image = image;

      const record = await this.service.update(id, data);

      res.json({
        message: "Admission process updated successfully",
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
      res.json({ message: "Admission process deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AdmissionProcessController;
