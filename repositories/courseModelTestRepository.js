// repositories/courseModelTestRepository.js
class CourseModelTestRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async bulkCreate(records) {
    return await this.model.bulkCreate(records);
  }

  async findAll(where = {}) {
    return await this.model.findAll({ where });
  }

  async findByCourseId(courseId) {
    return await this.model.findAll({
      where: { course_id: courseId },
      order: [["createdAt", "DESC"]],
    });
  }

  async findByModelTestId(modelTestId) {
    return await this.model.findAll({
      where: { model_test_id: modelTestId },
      order: [["createdAt", "DESC"]],
    });
  }

  async delete(where) {
    return await this.model.destroy({ where });
  }

  async exists(courseId, modelTestId) {
    return await this.model.findOne({
      where: { course_id: courseId, model_test_id: modelTestId },
    });
  }
}

module.exports = CourseModelTestRepository;
