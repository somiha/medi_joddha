// repositories/VideoLectureRepository.js
class VideoLectureRepository {
  constructor(model) {
    this.model = model;
    this.sequelize = model.sequelize || model.constructor?._sequelize;
    if (!this.sequelize) {
      throw new Error("Sequelize instance not available");
    }
  }

  _getPagination(offset = 0, limit = 10) {
    const offsetInt = parseInt(offset, 10) || 0;
    const limitInt = Math.min(parseInt(limit, 10) || 10, 100);
    return { offset: offsetInt, limit: limitInt };
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(query = {}) {
    const { offset, limit } = this._getPagination(query.offset, query.limit);

    const countQuery = `SELECT COUNT(*) AS total FROM video_lectures`;
    const dataQuery = `
      SELECT 
        vl.id,
        vl.url,
        vl.course,
        vl.course_id,
        vl.subject_id,
        vl.chapter_id,
        vl.topic_id,
        vl.notes,
        vl.created_at,
        vl.updated_at
      FROM video_lectures vl
      ORDER BY vl.id DESC
      LIMIT :limit OFFSET :offset
    `;

    const [totalResult] = await this.sequelize.query(countQuery, {
      type: this.sequelize.QueryTypes.SELECT,
    });

    const rows = await this.sequelize.query(dataQuery, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { limit, offset },
    });

    return {
      rows,
      count: parseInt(totalResult.total, 10),
    };
  }

  async findById(id) {
    const query = `
      SELECT 
        vl.id,
        vl.url,
        vl.course,
        vl.course_id,
        vl.subject_id,
        vl.chapter_id,
        vl.topic_id,
        vl.notes,
        vl.created_at,
        vl.updated_at
      FROM video_lectures vl
      WHERE vl.id = :id
      LIMIT 1
    `;

    const results = await this.sequelize.query(query, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { id },
    });

    return results[0] || null;
  }

  async findBySubjectId(subjectId, query = {}) {
    const { offset, limit } = this._getPagination(query.offset, query.limit);

    const countQuery = `SELECT COUNT(*) AS total FROM video_lectures WHERE subject_id = :subjectId`;
    const dataQuery = `
      SELECT 
        vl.id,
        vl.url,
        vl.course,
        vl.course_id,
        vl.subject_id,
        vl.chapter_id,
        vl.topic_id,
        vl.notes,
        vl.created_at,
        vl.updated_at
      FROM video_lectures vl
      WHERE vl.subject_id = :subjectId
      ORDER BY vl.id DESC
      LIMIT :limit OFFSET :offset
    `;

    const [totalResult] = await this.sequelize.query(countQuery, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { subjectId },
    });

    const rows = await this.sequelize.query(dataQuery, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { subjectId, limit, offset },
    });

    return {
      rows,
      count: parseInt(totalResult.total, 10),
    };
  }

  async findByChapterId(chapterId, query = {}) {
    const { offset, limit } = this._getPagination(query.offset, query.limit);

    const countQuery = `SELECT COUNT(*) AS total FROM video_lectures WHERE chapter_id = :chapterId`;
    const dataQuery = `
      SELECT 
        vl.id,
        vl.url,
        vl.course,
        vl.course_id,
        vl.subject_id,
        vl.chapter_id,
        vl.topic_id,
        vl.notes,
        vl.created_at,
        vl.updated_at
      FROM video_lectures vl
      WHERE vl.chapter_id = :chapterId
      ORDER BY vl.id DESC
      LIMIT :limit OFFSET :offset
    `;

    const [totalResult] = await this.sequelize.query(countQuery, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { chapterId },
    });

    const rows = await this.sequelize.query(dataQuery, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { chapterId, limit, offset },
    });

    return {
      rows,
      count: parseInt(totalResult.total, 10),
    };
  }

  async update(id, data) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  async delete(id) {
    const record = await this.model.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return record;
  }
}

module.exports = VideoLectureRepository;
