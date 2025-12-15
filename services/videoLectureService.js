// services/VideoLectureService.js
const VideoLectureRepository = require("../repositories/videoLectureRepository");
const db = require("../models");

class VideoLectureService {
  constructor() {
    this.repo = new VideoLectureRepository(db.VideoLecture);
  }

  async getAll(query) {
    return await this.repo.findAll(query);
  }

  async getById(id) {
    return await this.repo.findById(id);
  }

  async getBySubjectId(subjectId, query) {
    return await this.repo.findBySubjectId(subjectId, query);
  }

  async getByChapterId(chapterId, query) {
    return await this.repo.findByChapterId(chapterId, query);
  }

  async create(data) {
    return await this.repo.create(data);
  }

  async update(id, data) {
    return await this.repo.update(id, data);
  }

  async delete(id) {
    return await this.repo.delete(id);
  }
}

module.exports = VideoLectureService;
