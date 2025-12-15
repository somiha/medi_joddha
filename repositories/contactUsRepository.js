// repositories/ContactUsRepository.js
class ContactUsRepository {
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

    const countQuery = `SELECT COUNT(*) AS total FROM contact_us`;
    const dataQuery = `
      SELECT 
        id,
        mobile_number,
        email,
        address,
        created_at,
        updated_at
      FROM contact_us
      ORDER BY id DESC
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
}

module.exports = ContactUsRepository;
