// repositories/programRepository.js
class ProgramRepository {
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
    const program = await this.model.findByPk(id);
    if (!program) return null;
    return await program.update(data);
  }

  async delete(id) {
    const program = await this.model.findByPk(id);
    if (!program) return null;
    await program.destroy();
    return program;
  }
}

module.exports = ProgramRepository;
