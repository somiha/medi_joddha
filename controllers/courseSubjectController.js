// controllers/courseSubjectController.js
class CourseSubjectController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getByCourse = this.getByCourse.bind(this);
    this.getBySubject = this.getBySubject.bind(this);
    this.remove = this.remove.bind(this);
  }

  async add(req, res) {
    try {
      const { course_id, subject_id } = req.body;

      if (!course_id || !subject_id) {
        return res
          .status(400)
          .json({ error: "course_id and subject_id are required" });
      }

      const mapping = await this.service.add(course_id, subject_id);

      res.status(201).json({
        message: "Subject added to course successfully",
        mapping,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.service.getAll(req.query);
      res.json({ mappings: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByCourse(req, res) {
    try {
      const { courseId } = req.params;
      const result = await this.service.getByCourseId(courseId);
      res.json({ course_id: courseId, subjects: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBySubject(req, res) {
    try {
      const { subjectId } = req.params;
      const result = await this.service.getBySubjectId(subjectId);
      res.json({ subject_id: subjectId, courses: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      const { course_id, subject_id } = req.body;

      if (!course_id || !subject_id) {
        return res
          .status(400)
          .json({ error: "course_id and subject_id are required" });
      }

      await this.service.remove(course_id, subject_id);

      res.json({ message: "Subject removed from course successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CourseSubjectController;
