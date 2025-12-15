// controllers/programController.js
class ProgramController {
  constructor(programService) {
    this.programService = programService;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { name, title, short_des, is_draft, is_published } = req.body;
      const data = { name, title, short_des };

      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const program = await this.programService.create(data);

      res.status(201).json({
        message: "Program created successfully",
        program,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.programService.getAll(req.query);

      res.json({
        programs: result.rows,
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
      const program = await this.programService.getById(id);

      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }

      res.json({ program });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, title, short_des, is_draft, is_published } = req.body;
      const data = {};

      console.log("is_published", is_published);
      console.log("is_draft", is_draft);

      if (name) data.name = name;
      if (title) data.title = title;
      if (short_des) data.short_des = short_des;
      if (is_draft !== undefined) data.is_draft = is_draft === true;
      if (is_published !== undefined) data.is_published = is_published === true;

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const program = await this.programService.update(id, data);

      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }

      res.json({
        message: "Program updated successfully",
        program,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.programService.delete(id);

      res.json({ message: "Program deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProgramController;
