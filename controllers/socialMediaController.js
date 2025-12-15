// controllers/SocialMediaController.js
class SocialMediaController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { title, url } = req.body;
      console.log("Request Body:", req.body);

      const data = {
        title,
        url,
      };

      if (req.file) {
        const baseUrl =
          process.env.BASE_URL ||
          `http://localhost:${process.env.PORT || 3000}`;
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const social = await this.service.create(data);

      res.status(201).json({
        message: "Social media link created successfully",
        social,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const result = await this.service.getAll({ offset, limit });

      res.json({
        socials: result.rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.count / limit),
          totalItems: result.count,
          hasNext: page * limit < result.count,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const social = await this.service.getById(id);

      if (!social) {
        return res.status(404).json({ error: "Social media not found" });
      }

      res.json({ social });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, url } = req.body;

      const data = {};
      if (title) data.title = title;
      if (url) data.url = url;

      if (req.file) {
        const baseUrl =
          process.env.BASE_URL ||
          `http://localhost:${process.env.PORT || 3000}`;
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const social = await this.service.update(id, data);

      if (!social) {
        return res.status(404).json({ error: "Social media not found" });
      }

      res.json({
        message: "Social media updated successfully",
        social,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);

      res.json({ message: "Social media deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = SocialMediaController;
