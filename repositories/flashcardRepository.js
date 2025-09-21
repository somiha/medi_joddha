// repositories/flashcardRepository.js
class FlashcardRepository {
  constructor(model) {
    this.model = model;
    this.sequelize =
      model.sequelize ||
      (model.constructor ? model.constructor._sequelize : null);

    if (!this.sequelize) {
      throw new Error("Sequelize instance not available on the model.");
    }

    this.QueryTypes = this.sequelize.constructor.QueryTypes;
  }

  async findAll(filters = {}) {
    let whereClause = [];
    const replacements = {};

    // Always: only "Flash Card" type
    whereClause.push(`tt.name = 'Flash Card'`);

    if (filters.subject_id !== undefined) {
      whereClause.push(`mt.subject_id = :subject_id`);
      replacements.subject_id = filters.subject_id;
    }
    if (filters.course_id !== undefined) {
      whereClause.push(`cmt.course_id = :course_id`);
      replacements.course_id = filters.course_id;
    }
    if (filters.topic_id !== undefined) {
      whereClause.push(`cmt.topic_id = :topic_id`);
      replacements.topic_id = filters.topic_id;
    }

    const whereSql = whereClause.length
      ? `WHERE ${whereClause.join(" AND ")}`
      : "";

    const query = `
      SELECT 
        mtq.id,
        mtq.model_test_id,
        mtq.question_id,
        mtq.\`order\`,
        mtq.marks,
        mtq.time_seconds,
        mtq.negative_marking_percent,
        mtq.created_at,
        mtq.updated_at,

        mt.title AS test_title,
        mt.year AS test_year,
        mt.subject_id AS test_subject_id,

        cmt.course_id,
        cmt.topic_id

      FROM model_test_questions AS mtq
      INNER JOIN model_tests AS mt ON mtq.model_test_id = mt.id
      INNER JOIN test_type AS tt ON mt.type_id = tt.id
      INNER JOIN course_model_tests AS cmt ON mt.id = cmt.model_test_id

      ${whereSql}
      ORDER BY mtq.id DESC
    `;

    return await this.sequelize.query(query, {
      type: this.QueryTypes.SELECT,
      replacements,
    });
  }

  async findById(id) {
    const query = `
      SELECT 
        mtq.id,
        mtq.model_test_id,
        mtq.question_id,
        mtq.\`order\`,
        mtq.marks,
        mtq.time_seconds,
        mtq.negative_marking_percent,
        mtq.created_at,
        mtq.updated_at,

        mt.title AS test_title,
        mt.year AS test_year,
        mt.subject_id AS test_subject_id,

        cmt.course_id,
        cmt.topic_id

      FROM model_test_questions AS mtq
      INNER JOIN model_tests AS mt ON mtq.model_test_id = mt.id
      INNER JOIN test_type AS tt ON mt.type_id = tt.id
      INNER JOIN course_model_tests AS cmt ON mt.id = cmt.model_test_id

      WHERE mtq.id = :id
      LIMIT 1
    `;

    const results = await this.sequelize.query(query, {
      type: this.QueryTypes.SELECT,
      replacements: { id },
    });

    return results[0] || null;
  }
}

module.exports = FlashcardRepository;
