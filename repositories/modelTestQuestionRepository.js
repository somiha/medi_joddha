// repositories/modelTestQuestionRepository.js
class ModelTestQuestionRepository {
  constructor(model) {
    this.model = model;
    this.sequelize = model.sequelize || model.constructor?._sequelize;
  }

  async bulkCreate(records) {
    return await this.model.bulkCreate(records, { validate: true });
  }

  async deleteByTestAndQuestions(model_test_id, question_ids) {
    return await this.model.destroy({
      where: {
        model_test_id,
        question_id: { [this.sequelize.Op.in]: question_ids },
      },
    });
  }

  async getQuestionsWithDetails(modelTestId) {
    const query = `
        SELECT 
          mtq.id,
          mtq.model_test_id,
          mtq.question_id,
          mtq.order,
          mtq.marks,
          mtq.time_seconds,
          mtq.negative_marking_percent,
          q.question AS question_text,
          q.answer,
          q.option1,
          q.option2,
          q.option3,
          q.option4,
          q.option5,
          q.image AS question_image,
          s.name AS subject_name,
          c.name AS chapter_name,
          c.title AS chapter_title
        FROM model_test_questions mtq
        LEFT JOIN questions q ON mtq.question_id = q.id
        LEFT JOIN subjects s ON q.subject_id = s.id
        LEFT JOIN chapters c ON q.chapter_id = c.id
        WHERE mtq.model_test_id = :modelTestId
        ORDER BY mtq.order ASC
      `;

    const [results] = await this.sequelize.query(query, {
      replacements: { modelTestId },
    });

    return results;
  }
}

module.exports = ModelTestQuestionRepository;
