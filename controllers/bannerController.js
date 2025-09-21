// controllers/bannerController.js
const { uploadImage } = require("../middleware/upload");

class BannerController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
      }

      const baseUrl = process.env.BASE_URL || "http://localhost:5000";
      const imagePath = `${baseUrl}/uploads/banners/${req.file.filename}`;

      const data = { image: imagePath };
      const banner = await this.service.create(data);

      res.status(201).json({
        message: "Banner created successfully",
        banner,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll();
      res.json({ banners: result.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const banner = await this.service.getById(id);
      res.json({ banner });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Banner deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = BannerController;
