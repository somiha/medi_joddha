// services/admissionProcessService.js
const AdmissionProcessRepository = require("../repositories/admissionProcessRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class AdmissionProcessService {
  constructor() {
    this.repo = new AdmissionProcessRepository(db.AdmissionProcess);
  }

  async add(data) {
    const { title, description } = data;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    return await this.repo.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    return await this.repo.findAll(offset, limit);
  }

  async getById(id) {
    const process = await this.repo.findById(id);
    if (!process) throw new Error("Admission process not found");
    return process;
  }

  async update(id, data) {
    const process = await this.repo.findById(id);
    if (!process) throw new Error("Admission process not found");

    if (data.image && process.image) {
      await deleteImage(process.image);
    }

    return await process.update(data);
  }

  async delete(id) {
    const process = await this.repo.findById(id);
    if (!process) throw new Error("Admission process not found");

    if (process.image) {
      await deleteImage(process.image);
    }

    await process.destroy();
    return { message: "Admission process deleted successfully" };
  }
}

module.exports = AdmissionProcessService;
