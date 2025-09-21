// services/mnemonicService.js
const MnemonicRepository = require("../repositories/mnemonicRepository");
const { deleteImage } = require("../utils/fileHelper");

class MnemonicService {
  constructor(db) {
    this.repo = new MnemonicRepository(db.Mnemonic);
    this.db = db;
  }

  async create(data) {
    const { subject_id, chapter_id, description } = data;

    if (!subject_id || !chapter_id || !description) {
      throw new Error("Subject ID, Chapter ID, and description are required");
    }

    // Validate subject, chapter, topic exist (optional)
    const subject = await this.db.Subject.findByPk(subject_id);
    if (!subject) throw new Error("Subject not found");

    const chapter = await this.db.Chapter.findByPk(chapter_id);
    if (!chapter) throw new Error("Chapter not found");

    if (data.topic_id) {
      const topic = await this.db.Topic.findByPk(data.topic_id);
      if (!topic) throw new Error("Topic not found");
    }

    return await this.repo.create(data);
  }

  async getBySubjectId(subject_id) {
    const records = await this.repo.findAll({ subject_id });
    if (records.length === 0)
      throw new Error("No mnemonics found for this subject");
    return records;
  }

  async getByChapterId(chapter_id) {
    const records = await this.repo.findAll({ chapter_id });
    if (records.length === 0)
      throw new Error("No mnemonics found for this chapter");
    return records;
  }

  async getByTopicId(topic_id) {
    const records = await this.repo.findAll({ topic_id });
    if (records.length === 0)
      throw new Error("No mnemonics found for this topic");
    return records;
  }

  async getById(id) {
    const record = await this.repo.findById(id);
    if (!record) throw new Error("Mnemonic not found");
    return record;
  }

  async update(id, data) {
    const mnemonic = await this.repo.findById(id);
    if (!mnemonic) throw new Error("Mnemonic not found");

    // Delete old image if new one uploaded
    if (data.image && mnemonic.image) {
      await deleteImage(mnemonic.image);
    }

    return await this.repo.update(id, data);
  }

  async delete(id) {
    const mnemonic = await this.repo.findById(id);
    if (!mnemonic) throw new Error("Mnemonic not found");

    // Delete image file
    if (mnemonic.image) {
      await deleteImage(mnemonic.image);
    }

    await this.repo.delete(id);
    return { message: "Mnemonic deleted successfully" };
  }
}

module.exports = MnemonicService;
