// controllers/examMakerController.js
class ExamMakerController {
  constructor(service) {
    this.service = service;

    this.createExam = this.createExam.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.delete = this.delete.bind(this);
  }

  async createExam(req, res) {
    try {
      const {
        user_id,
        program_id,
        course_id,
        subject_id,
        number_of_questions,
        question_types,
        time_duration,
      } = req.body;

      const data = {
        user_id,
        program_id,
        course_id,
        subject_id,
        number_of_questions,
        question_types,
        time_duration,
      };

      const exam = await this.service.createExam(data);

      res.status(201).json({
        message: "Exam created successfully",
        exam,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const exam = await this.service.getById(id);
      res.json({ exam });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const exams = await this.service.getAll();
      res.json({ exams });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByUserId(req, res) {
    try {
      const { user_id } = req.params;
      const exams = await this.service.getByUserId(user_id);
      res.json({ exams });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async submitAnswers(req, res) {
    try {
      const { id } = req.params;
      const { given_answers, time_taken } = req.body;

      if (!given_answers || typeof given_answers !== "object") {
        return res
          .status(400)
          .json({ error: "Valid given_answers object is required" });
      }

      const exam = await this.service.submitAnswers(
        id,
        given_answers,
        time_taken
      );

      res.json({
        message: "Answers submitted successfully",
        exam,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      res.json({ message: "Exam deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ExamMakerController;
