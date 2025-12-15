// repositories/courseRepository.js
class CourseRepository {
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
      order: [["id", "ASC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const course = await this.model.findByPk(id);
    if (!course) return null;
    return await course.update(data);
  }

  async delete(id) {
    const course = await this.model.findByPk(id);
    if (!course) return null;
    await course.destroy();
    return course;
  }
}

module.exports = CourseRepository;
