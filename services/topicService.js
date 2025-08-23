const {
  Sequelize: { Op },
} = require("sequelize");
const TopicRepository = require("../repositories/topicRepository");
const db = require("../models");
const { deleteImage } = require("../utils/fileHelper");

class TopicService {
  constructor() {
    this.topicRepository = new TopicRepository(db.Topic);
  }

  async create(data) {
    return await this.topicRepository.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    const { is_draft, is_published, search, chapter_id } = query;
    const where = {};

    if (chapter_id) where.chapter_id = chapter_id;
    if (is_draft !== undefined) where.is_draft = is_draft === "true";
    if (is_published !== undefined)
      where.is_published = is_published === "true";

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { title: { [Op.like]: `%${search}%` } },
        { short_des: { [Op.like]: `%${search}%` } },
      ];
    }

    return await this.topicRepository.findAll(where, offset, limit);
  }

  async getById(id) {
    return await this.topicRepository.findById(id);
  }

  async update(id, data) {
    const topic = await this.topicRepository.findById(id);
    if (!topic) return null;

    if (data.image && topic.image) {
      await deleteImage(topic.image);
    }

    return await topic.update(data);
  }

  async delete(id) {
    const topic = await this.topicRepository.findById(id);
    if (!topic) return null;
    if (topic.image) {
      await deleteImage(topic.image);
    }

    await topic.destroy();
    return topic;
  }
}

module.exports = TopicService;
