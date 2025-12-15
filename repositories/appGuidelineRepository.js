// repositories/AppGuidelineRepository.js
class AppGuidelineRepository {
  constructor(model) {
    this.model = model;
    this.sequelize = model.sequelize || model.constructor?._sequelize;
    if (!this.sequelize) {
      throw new Error("Sequelize instance not available");
    }
  }

  _getPagination(offset = 0, limit = 10) {
    const offsetInt = parseInt(offset, 10) || 0;
    const limitInt = Math.min(parseInt(limit, 10) || 10, 100);
    return { offset: offsetInt, limit: limitInt };
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(query = {}) {
    const { offset, limit } = this._getPagination(query.offset, query.limit);

    const countQuery = `SELECT COUNT(*) AS total FROM app_guidelines`;
    const dataQuery = `
      SELECT 
        ag.id,
        ag.title,
        ag.video,
        ag.video_url,
        ag.created_at,
        ag.updated_at
      FROM app_guidelines ag
      ORDER BY ag.id DESC
      LIMIT :limit OFFSET :offset
    `;

    const [totalResult] = await this.sequelize.query(countQuery, {
      type: this.sequelize.QueryTypes.SELECT,
    });

    const rows = await this.sequelize.query(dataQuery, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { limit, offset },
    });

    return {
      rows,
      count: parseInt(totalResult.total, 10),
    };
  }

  async findById(id) {
    const query = `
      SELECT 
        ag.id,
        ag.title,
        ag.video,
        ag.video_url,
        ag.created_at,
        ag.updated_at
      FROM app_guidelines ag
      WHERE ag.id = :id
      LIMIT 1
    `;

    const results = await this.sequelize.query(query, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { id },
    });

    return results[0] || null;
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
}

module.exports = AppGuidelineRepository;
