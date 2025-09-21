// repositories/mnemonicRepository.js
class MnemonicRepository {
  constructor(model) {
    this.model = model;
    const sequelize =
      model.sequelize ||
      (model.constructor ? model.constructor._sequelize : null);

    if (!sequelize) {
      throw new Error("Sequelize instance not available");
    }

    this.sequelize = sequelize;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(where = {}) {
    let whereClause = [];
    const replacements = {};

    if (where.subject_id !== undefined) {
      whereClause.push(`subject_id = :subject_id`);
      replacements.subject_id = where.subject_id;
    }
    if (where.chapter_id !== undefined) {
      whereClause.push(`chapter_id = :chapter_id`);
      replacements.chapter_id = where.chapter_id;
    }
    if (where.topic_id !== undefined) {
      whereClause.push(`topic_id = :topic_id`);
      replacements.topic_id = where.topic_id;
    }
    if (where.is_published !== undefined) {
      whereClause.push(`is_published = :is_published`);
      replacements.is_published = where.is_published;
    }

    const whereSql = whereClause.length
      ? `WHERE ${whereClause.join(" AND ")}`
      : "";

    const query = `
      SELECT 
        id,
        subject_id,
        chapter_id,
        topic_id,
        description,
        is_published,
        image,
        created_at,
        updated_at
      FROM mnemonics
      ${whereSql}
      ORDER BY id DESC
    `;

    return await this.sequelize.query(query, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements,
    });
  }

  async findById(id) {
    const results = await this.sequelize.query(
      "SELECT * FROM mnemonics WHERE id = :id",
      {
        type: this.sequelize.QueryTypes.SELECT,
        replacements: { id },
      }
    );
    return results[0] || null;
  }

  async update(id, data) {
    const record = await this.findById(id);
    if (!record) return null;

    const keys = Object.keys(data).filter((key) => data[key] !== undefined);
    const setParts = keys.map((key, i) => `${key} = :${key}`).join(", ");

    const query = `UPDATE mnemonics SET ${setParts} WHERE id = :id`;
    const replacements = { id, ...data };

    await this.sequelize.query(query, {
      type: this.sequelize.QueryTypes.UPDATE,
      replacements,
    });

    // Return updated record
    return await this.findById(id);
  }

  async delete(id) {
    const record = await this.findById(id);
    if (!record) return null;

    await this.model.destroy({ where: { id } });
    return record;
  }
}

module.exports = MnemonicRepository;
