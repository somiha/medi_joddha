// repositories/courseSubjectRepository.js
class CourseSubjectRepository {
  constructor(model) {
    this.model = model;
    const sequelize =
      model.sequelize ||
      (model.constructor ? model.constructor._sequelize : null);

    if (!sequelize) {
      throw new Error(
        "Sequelize instance is not available on the model. Check if the model is properly initialized."
      );
    }

    this.sequelize = sequelize;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll(where = {}) {
    let whereClause = "";
    const replacements = {};

    if (where.course_id !== undefined) {
      whereClause += " AND cs.course_id = :course_id";
      replacements.course_id = where.course_id;
    }
    if (where.subject_id !== undefined) {
      whereClause += " AND cs.subject_id = :subject_id";
      replacements.subject_id = where.subject_id;
    }

    const query = `
      SELECT 
        cs.id,
        cs.course_id,
        cs.subject_id,
        c.name AS course_name,
        c.title AS course_title,
        c.short_des AS course_short_des,
        c.is_draft AS course_is_draft,
        c.is_published AS course_is_published,
        c.image AS course_image,
        s.name AS subject_name,
        s.title AS subject_title,
        s.short_des AS subject_short_des,
        s.is_draft AS subject_is_draft,
        s.is_published AS subject_is_published,
        s.image AS subject_image
      FROM course_subject cs
      LEFT JOIN courses c ON cs.course_id = c.id
      LEFT JOIN subjects s ON cs.subject_id = s.id
      WHERE 1=1 ${whereClause}
      ORDER BY cs.id DESC
    `;

    return await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
      replacements,
    });
  }

  async findByCourseId(courseId) {
    const query = `
      SELECT 
        cs.id,
        cs.subject_id,
        s.name AS subject_name,
        s.title AS subject_title,
        s.short_des AS subject_short_des,
        s.is_draft AS subject_is_draft,
        s.is_published AS subject_is_published,
        s.image AS subject_image
      FROM course_subject cs
      LEFT JOIN courses c ON cs.course_id = c.id
      LEFT JOIN subjects s ON cs.subject_id = s.id
      WHERE cs.course_id = :courseId
    `;

    const result = await this.sequelize.query(query, {
      type: this.sequelize.QueryTypes.SELECT,
      replacements: { courseId },
    });

    return result;
  }

  async findBySubjectId(subjectId) {
    const query = `
      SELECT 
        cs.id,
        cs.course_id,
        cs.subject_id,
        c.name AS course_name,
        c.title AS course_title,
        c.short_des AS course_short_des,
        c.is_draft AS course_is_draft,
        c.is_published AS course_is_published,
        c.image AS course_image,
        s.name AS subject_name,
        s.title AS subject_title,
        s.short_des AS subject_short_des,
        s.is_draft AS subject_is_draft,
        s.is_published AS subject_is_published,
        s.image AS subject_image
      FROM course_subject cs
      LEFT JOIN courses c ON cs.course_id = c.id
      LEFT JOIN subjects s ON cs.subject_id = s.id
      WHERE cs.subject_id = :subjectId
      ORDER BY cs.id DESC
    `;

    return await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
      replacements: { subjectId },
    });
  }

  async delete(where) {
    const record = await this.model.findOne({ where });
    if (!record) return null;
    await record.destroy();
    return record;
  }

  async exists(courseId, subjectId) {
    return await this.model.findOne({
      where: { course_id: courseId, subject_id: subjectId },
    });
  }
}

module.exports = CourseSubjectRepository;
