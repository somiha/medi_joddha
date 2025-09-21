// controllers/courseModelTestController.js
class CourseModelTestController {
  constructor(service) {
    this.service = service;

    this.add = this.add.bind(this);
    this.addBulk = this.addBulk.bind(this);
    this.getByCourse = this.getByCourse.bind(this);
    this.getCoursesByTest = this.getCoursesByTest.bind(this);
    this.remove = this.remove.bind(this);
  }

  async add(req, res) {
    try {
      const {
        course_id,
        model_test_id,
        name,
        duration_minutes,
        subject_id,
        topic_id,
      } = req.body;

      if (!course_id || !model_test_id) {
        return res.status(400).json({
          error: "course_id and model_test_id are required",
        });
      }

      const record = await this.service.add(
        course_id,
        model_test_id,
        name,
        duration_minutes,
        subject_id,
        topic_id
      );

      res.status(201).json({
        message: "Model test linked to course successfully",
        data: record,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addBulk(req, res) {
    try {
      const { course_id, tests } = req.body;

      if (!course_id || !Array.isArray(tests) || tests.length === 0) {
        return res
          .status(400)
          .json({ error: "course_id and tests array are required" });
      }

      const records = await this.service.addBulk(course_id, tests);

      res.status(201).json({
        message: `${records.length} model tests linked to course`,
        count: records.length,
        records,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByCourse(req, res) {
    try {
      const { courseId } = req.params;
      const data = await this.service.getByCourseId(courseId);
      res.json({ model_tests: data });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getCoursesByTest(req, res) {
    try {
      const { modelTestId } = req.params;
      const data = await this.service.getCoursesByModelTestId(modelTestId);
      res.json({ courses: data });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async remove(req, res) {
    try {
      const { course_id, model_test_id } = req.body;

      if (!course_id || !model_test_id) {
        return res
          .status(400)
          .json({ error: "course_id and model_test_id are required" });
      }

      await this.service.remove(course_id, model_test_id);

      res.json({ message: "Model test unlinked from course" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CourseModelTestController;
