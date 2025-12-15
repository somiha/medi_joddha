// controllers/chapterController.js
class ChapterController {
  constructor(chapterService) {
    this.chapterService = chapterService;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const {
        subject_id,
        name,
        title,
        short_des,
        is_draft,
        is_published,
        serial_id,
      } = req.body;
      const data = { subject_id, name, title, short_des, serial_id };

      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const chapter = await this.chapterService.create(data);

      res.status(201).json({
        message: "Chapter created successfully",
        chapter,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.chapterService.getAll(req.query);

      res.json({
        chapters: result.rows,
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
      const chapter = await this.chapterService.getById(id);

      if (!chapter) {
        return res.status(404).json({ error: "Chapter not found" });
      }

      res.json({ chapter });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        subject_id,
        name,
        title,
        short_des,
        is_draft,
        is_published,
        serial_id,
      } = req.body;
      const data = {};

      if (subject_id) data.subject_id = subject_id;
      if (serial_id) data.serial_id = serial_id;
      if (name) data.name = name;
      if (title) data.title = title;
      if (short_des) data.short_des = short_des;
      if (is_draft !== undefined) data.is_draft = is_draft === true;
      if (is_published !== undefined) data.is_published = is_published === true;

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const chapter = await this.chapterService.update(id, data);

      res.json({
        message: "Chapter updated successfully",
        chapter,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.chapterService.delete(id);

      res.json({ message: "Chapter deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ChapterController;
