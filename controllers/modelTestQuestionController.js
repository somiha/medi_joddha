// controllers/modelTestQuestionController.js
class ModelTestQuestionController {
  constructor(service) {
    this.service = service;

    this.addQuestions = this.addQuestions.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.removeQuestions = this.removeQuestions.bind(this);
  }

  async addQuestions(req, res) {
    try {
      const { model_test_id } = req.params;
      const { questions } = req.body;

      if (!Array.isArray(questions) || questions.length === 0) {
        return res
          .status(400)
          .json({ error: "Questions must be a non-empty array" });
      }

      const questionsData = questions.map((q) => ({
        question_id: q.question_id,
        order: q.order,
        marks: q.marks,
        time_seconds: q.time_seconds,
        negative_marking_percent: q.negative_marking_percent,
      }));

      const records = await this.service.addQuestions(
        parseInt(model_test_id),
        questionsData
      );

      res.status(201).json({
        message: `${records.length} questions added to test successfully`,
        count: records.length,
        data: records,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getQuestions(req, res) {
    try {
      const { model_test_id } = req.params;
      const questions = await this.service.getQuestionsByTestId(model_test_id);

      if (questions.length === 0) {
        return res
          .status(404)
          .json({ error: "No questions found for this test" });
      }

      res.json({ questions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async removeQuestions(req, res) {
    try {
      const { model_test_id } = req.params;
      const { question_ids } = req.body;

      if (!Array.isArray(question_ids) || question_ids.length === 0) {
        return res
          .status(400)
          .json({ error: "question_ids must be a non-empty array" });
      }

      await this.service.removeQuestions(model_test_id, question_ids);

      res.json({ message: "Questions removed from test successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ModelTestQuestionController;
