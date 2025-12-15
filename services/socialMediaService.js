// services/SocialMediaService.js
const SocialMediaRepository = require("../repositories/socialMediaRepository");
const db = require("../models");
const { deleteFile } = require("../utils/fileHelper");

class SocialMediaService {
  constructor() {
    this.repo = new SocialMediaRepository(db.SocialMedia);
  }

  async getAll(query) {
    return await this.repo.findAll(query);
  }

  async getById(id) {
    return await this.repo.findById(id);
  }

  async create(data) {
    return await this.repo.create(data);
  }

  async update(id, data) {
    const media = await this.repo.findById(id);
    if (!media) return null;

    // Delete old image if replaced
    if (data.image && media.image) {
      await deleteFile(media.image);
    }

    return await this.repo.update(id, data);
  }

  async delete(id) {
    const media = await this.repo.findById(id);
    if (!media) return null;

    // Delete physical image
    if (media.image) {
      await deleteFile(media.image);
    }

    return await this.repo.delete(id);
  }
}

module.exports = SocialMediaService;
