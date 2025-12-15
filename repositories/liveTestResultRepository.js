// repositories/liveTestRepository.js
class LiveTestResultRepository {
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

  async create(data) {
    return await this.model.create(data);
  }

  async findByUserId(user_id) {
    return await this.model.findAll({
      where: { user_id },
      order: [["created_at", "DESC"]],
    });
  }

  async findByTestId(test_id) {
    return await this.model.findAll({
      where: { test_id },
      order: [["created_at", "DESC"]],
    });
  }

  async findByUserAndTestId(user_id, test_id) {
    return await this.model.findOne({
      where: { user_id, test_id },
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return record;
  }
  async getTodaysTests() {
    const query = `
      SELECT 
        mt.id,
        mt.title,
        mt.is_published,
        mt.year,
        mt.is_archived,
        mt.subject_id,
        mt.created_at,
        mt.updated_at,
        mt.type_id,

        tt.id AS test_type_id,
        tt.name AS test_type_name,
        tt.created_at AS test_type_created_at,
        tt.updated_at AS test_type_updated_at

      FROM model_tests AS mt
      INNER JOIN test_type AS tt ON mt.type_id = tt.id
      WHERE DATE(CONVERT_TZ(mt.created_at, '+00:00', '+06:00')) = CURDATE()
      ORDER BY mt.created_at DESC
    `;

    const results = await this.sequelize.query(query, {
      type: this.QueryTypes.SELECT,
    });

    return results;
  }

  async getRankingByTestId(testId) {
    const query = `
      SELECT 
        ltr.id,
        ltr.user_id,
        ltr.test_id,
        ltr.marks,
        ltr.time_duration,
        ltr.right_answer,
        ltr.wrong_answer,
        ltr.skipped,
        ltr.created_at,
        ltr.updated_at,

        u.full_name,
        u.image AS user_image,
        u.institution_name,
        u.class

      FROM live_test_results AS ltr
      INNER JOIN users AS u ON ltr.user_id = u.id
      WHERE ltr.test_id = :testId
      ORDER BY 
        ltr.marks DESC,
        (ltr.time_duration / GREATEST(ltr.right_answer + ltr.wrong_answer, 1)) ASC
      LIMIT 100
    `;

    return await this.sequelize.query(query, {
      type: this.QueryTypes.SELECT,
      replacements: { testId },
    });
  }
}

module.exports = LiveTestResultRepository;
