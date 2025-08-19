// controllers/courseController.js
class CourseController {
  constructor(courseService) {
    this.courseService = courseService;

    // Bind methods to `this` so they keep context when passed as route handlers
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { program_id, name, title, short_des, is_draft, is_published } =
        req.body;
      const data = { program_id, name, title, short_des };

      if (is_draft !== undefined) data.is_draft = is_draft === "true";
      if (is_published !== undefined)
        data.is_published = is_published === "true";

      if (req.file) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
      }

      const course = await this.courseService.create(data);

      res.status(201).json({
        message: "Course created successfully",
        course,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.courseService.getAll(req.query);

      res.json({
        courses: result.rows,
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
      const course = await this.courseService.getById(id);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.json({ course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { program_id, name, title, short_des, is_draft, is_published } =
        req.body;
      const data = {};

      if (program_id) data.program_id = program_id;
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

      const course = await this.courseService.update(id, data);

      res.json({
        message: "Course updated successfully",
        course,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.courseService.delete(id);

      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CourseController;
