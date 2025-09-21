// controllers/mnemonicController.js
const { uploadImage } = require("../middleware/upload");

class MnemonicController {
  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.getBySubjectId = this.getBySubjectId.bind(this);
    this.getByChapterId = this.getByChapterId.bind(this);
    this.getByTopicId = this.getByTopicId.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { subject_id, chapter_id, topic_id, description, is_published } =
        req.body;
      let image = null;

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      } else if (req.body.image) {
        image = req.body.image;
      }

      if (!subject_id || !chapter_id || !description) {
        return res.status(400).json({
          error: "Subject ID, Chapter ID, and description are required",
        });
      }

      const data = {
        subject_id: parseInt(subject_id),
        chapter_id: parseInt(chapter_id),
        topic_id: topic_id ? parseInt(topic_id) : null,
        description,
        is_published: is_published === "true" || is_published === true,
        image,
      };

      const mnemonic = await this.service.create(data);

      res.status(201).json({
        message: "Mnemonic created successfully",
        mnemonic,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBySubjectId(req, res) {
    try {
      const { subject_id } = req.params;
      const mnemonics = await this.service.getBySubjectId(parseInt(subject_id));
      res.json({ mnemonics });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByChapterId(req, res) {
    try {
      const { chapter_id } = req.params;
      const mnemonics = await this.service.getByChapterId(parseInt(chapter_id));
      res.json({ mnemonics });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getByTopicId(req, res) {
    try {
      const { topic_id } = req.params;
      const mnemonics = await this.service.getByTopicId(parseInt(topic_id));
      res.json({ mnemonics });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const mnemonic = await this.service.getById(id);
      res.json({ mnemonic });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { subject_id, chapter_id, topic_id, description, is_published } =
        req.body;
      let image = req.body.image;

      if (!subject_id || !chapter_id || !description) {
        return res.status(400).json({
          error: "Subject ID, Chapter ID, and description are required",
        });
      }

      // Handle new image upload
      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const data = {
        subject_id: parseInt(subject_id),
        chapter_id: parseInt(chapter_id),
        topic_id: topic_id ? parseInt(topic_id) : null,
        description,
        is_published: is_published === "true" || is_published === true,
        image,
      };

      const mnemonic = await this.service.update(id, data);

      res.json({
        message: "Mnemonic updated successfully",
        mnemonic,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Mnemonic deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MnemonicController;
