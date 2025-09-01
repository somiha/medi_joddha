// services/modelTestQuestionService.js

class ModelTestQuestionService {
  constructor(modelTestQuestionRepo, modelTestRepo, questionRepo) {
    this.modelTestQuestionRepo = modelTestQuestionRepo;
    this.modelTestRepo = modelTestRepo;
    this.questionRepo = questionRepo;
  }

  async validate(model_test_id, question_ids) {
    const test = await this.modelTestRepo.findById(model_test_id);
    if (!test) throw new Error("Model Test not found");

    const questions = await this.questionRepo.findByIds(question_ids);
    const foundIds = questions.map((q) => q.id);
    const missing = question_ids.filter((id) => !foundIds.includes(id));

    if (missing.length > 0) {
      throw new Error(`Questions not found: ${missing.join(", ")}`);
    }
  }

  async addQuestions(model_test_id, questionsData) {
    const question_ids = questionsData.map((q) => q.question_id);
    await this.validate(model_test_id, question_ids);

    const records = questionsData.map((q, index) => ({
      model_test_id,
      question_id: q.question_id,
      order: q.order || index + 1,
      marks: q.marks || 1.0,
      time_seconds: q.time_seconds || 60,
      negative_marking_percent: q.negative_marking_percent || 0,
    }));

    return await this.modelTestQuestionRepo.bulkCreate(records);
  }

  async getQuestionsByTestId(modelTestId) {
    return await this.modelTestQuestionRepo.getQuestionsWithDetails(
      modelTestId
    );
  }

  async removeQuestions(model_test_id, question_ids) {
    return await this.modelTestQuestionRepo.deleteByTestAndQuestions(
      model_test_id,
      question_ids
    );
  }
}
module.exports = ModelTestQuestionService;
