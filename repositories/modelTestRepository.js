// repositories/modelTestRepository.js
class ModelTestRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(where = {}, offset = 0, limit = 10) {
    return await this.model.findAndCountAll({
      where,
      offset,
      limit,
      order: [["id", "DESC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const test = await this.model.findByPk(id);
    if (!test) return null;
    return await test.update(data);
  }

  async delete(id) {
    const test = await this.model.findByPk(id);
    if (!test) return null;
    await test.destroy();
    return test;
  }

  async findByIdWithTypeName(id) {
    const query = `
        SELECT 
          mt.id,
          mt.title,
          mt.is_published,
          mt.type_id,
          tt.name AS type_name,
          mt.year,
          mt.is_archived,
          mt.subject_id,
          mt.start_time,
          mt.end_time,
          mt.total_rankings,
          mt.created_at,
          mt.updated_at
        FROM model_tests mt
        LEFT JOIN test_type tt ON mt.type_id = tt.id
        WHERE mt.id = :id
        LIMIT 1
      `;

    const [results] = await this.model.sequelize.query(query, {
      replacements: { id },
    });

    return results[0] || null;
  }

  async findAllWithTypeName(where = {}, offset = 0, limit = 10) {
    let whereClause = "";
    const replacements = { ...where, offset, limit };

    if (where.type_id !== undefined) {
      whereClause += " AND mt.type_id = :type_id";
      replacements.type_id = where.type_id;
    }
    if (where.subject_id !== undefined) {
      whereClause += " AND mt.subject_id = :subject_id";
      replacements.subject_id = where.subject_id;
    }
    if (where.is_published !== undefined) {
      whereClause += " AND mt.is_published = :is_published";
      replacements.is_published = where.is_published;
    }
    if (where.is_archived !== undefined) {
      whereClause += " AND mt.is_archived = :is_archived";
      replacements.is_archived = where.is_archived;
    }

    const query = `
        SELECT 
          mt.id,
          mt.title,
          mt.is_published,
          mt.type_id,
          tt.name AS type_name,
          mt.year,
          mt.is_archived,
          mt.subject_id,
          mt.start_time,
          mt.end_time,
          mt.total_rankings,
          mt.created_at,
          mt.updated_at
        FROM model_tests mt
        LEFT JOIN test_type tt ON mt.type_id = tt.id
        WHERE 1=1 ${whereClause}
        ORDER BY mt.id DESC
        LIMIT :limit OFFSET :offset
      `;

    const [results] = await this.model.sequelize.query(query, { replacements });
    const count = results.length > 0 ? await this.model.count({ where }) : 0;

    return { rows: results, count };
  }
}

module.exports = ModelTestRepository;
