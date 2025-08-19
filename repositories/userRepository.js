// repositories/userRepository.js
class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async createUser(data) {
    return await this.model.create(data);
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }

  async findByMobile(mobile_number) {
    return await this.model.findOne({ where: { mobile_number } });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }
}

module.exports = UserRepository;
