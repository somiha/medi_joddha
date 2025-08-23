class TopicController {
  constructor(topicService) {
    this.topicService = topicService;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { chapter_id, name, title, short_des, is_draft, is_published } =
        req.body;
      const data = { chapter_id, name, title, short_des };

      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const topic = await this.topicService.create(data);

      res.status(201).json({
        message: "Topic created successfully",
        topic,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.topicService.getAll(req.query);

      res.json({
        topics: result.rows,
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
      const topic = await this.topicService.getById(id);

      if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
      }

      res.json({ topic });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { chapter_id, name, title, short_des, is_draft, is_published } =
        req.body;
      const data = {};

      if (chapter_id) data.chapter_id = chapter_id;
      if (name) data.name = name;
      if (title) data.title = title;
      if (short_des) data.short_des = short_des;
      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const topic = await this.topicService.update(id, data);

      if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
      }

      res.json({
        message: "Topic updated successfully",
        topic,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.topicService.delete(id);

      res.json({ message: "Topic deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = TopicController;
