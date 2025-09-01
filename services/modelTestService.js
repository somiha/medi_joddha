// services/modelTestService.js
class ModelTestService {
  constructor(modelTestRepo) {
    this.repo = modelTestRepo;
  }

  async create(data) {
    const { subject_id, type_id } = data;
    if (subject_id) {
      const subject = await this.repo.model.sequelize.models.Subject.findByPk(
        subject_id
      );
      if (!subject) throw new Error("Subject not found");
    }

    const type =
      (await this.repo.model.sequelize.models.TestType?.findByPk(type_id)) ||
      (await this.repo.model.sequelize
        .query("SELECT * FROM test_type WHERE id = :type_id", {
          type: this.repo.model.sequelize.QueryTypes.SELECT,
          replacements: { type_id },
        })
        .then((r) => r[0]));

    if (!type) throw new Error("Test Type not found");

    return await this.repo.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { type_id, subject_id, is_published, is_archived, year, search } =
      query;
    const where = {};

    if (type_id) where.type_id = type_id;
    if (subject_id) where.subject_id = subject_id;
    if (is_published !== undefined)
      where.is_published = is_published === "true";
    if (is_archived !== undefined) where.is_archived = is_archived === "true";

    if (search) {
      where.title = {
        [this.repo.model.sequelize.Op.like]: `%${search}%`,
      };
    }

    return await this.repo.findAllWithTypeName(where, offset, limit);
  }

  async getById(id) {
    const test = await this.repo.findById(id);
    if (!test) throw new Error("Model Test not found");
    return test;
  }

  async getByIdWithTypeName(id) {
    const test = await this.repo.findByIdWithTypeName(id);
    if (!test) throw new Error("Model Test not found");
    return test;
  }

  async update(id, data) {
    const { subject_id, type_id } = data;

    if (subject_id !== undefined && subject_id !== null) {
      const subject = await this.repo.model.sequelize.models.Subject.findByPk(
        subject_id
      );
      if (!subject) throw new Error("Subject not found");
    }

    if (type_id !== undefined) {
      const type = await this.repo.model.sequelize
        .query("SELECT * FROM test_type WHERE id = :type_id", {
          type: this.repo.model.sequelize.QueryTypes.SELECT,
          replacements: { type_id },
        })
        .then((r) => r[0]);

      if (!type) throw new Error("Test Type not found");
    }

    const test = await this.repo.update(id, data);
    if (!test) throw new Error("Model Test not found");
    return test;
  }

  async delete(id) {
    const test = await this.repo.delete(id);
    if (!test) throw new Error("Model Test not found");
    return test;
  }
}

module.exports = ModelTestService;
