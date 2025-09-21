// services/bannerService.js
const BannerRepository = require("../repositories/bannerRepository");
const db = require("../models");

class BannerService {
  constructor() {
    this.bannerRepository = new BannerRepository(db.Banner);
  }

  async create(data) {
    return await this.bannerRepository.create(data);
  }

  async getAll() {
    return await this.bannerRepository.findAll();
  }

  async getById(id) {
    const banner = await this.bannerRepository.findById(id);
    if (!banner) throw new Error("Banner not found");
    return banner;
  }

  async delete(id) {
    const banner = await this.bannerRepository.delete(id);
    if (!banner) throw new Error("Banner not found");
    return banner;
  }
}

module.exports = BannerService;
