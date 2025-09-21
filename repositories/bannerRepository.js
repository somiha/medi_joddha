// repositories/bannerRepository.js
const { deleteImage } = require("../utils/fileHelper");

class BannerRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(offset = 0, limit = 10) {
    return await this.model.findAndCountAll({
      offset,
      limit,
      order: [["id", "DESC"]],
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return null;

    // Delete image file
    if (record.image) {
      await deleteImage(record.image);
    }

    await record.destroy();
    return record;
  }
}

module.exports = BannerRepository;
