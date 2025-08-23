// repositories/schoolCollegeQuestionRepository.js
class SchoolCollegeQuestionRepository {
  constructor(model) {
    this.model = model;
    this.sequelize = model.sequelize || model.constructor?._sequelize;
    if (!this.sequelize) {
      throw new Error("Sequelize instance not available");
    }
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll() {
    const query = `
        SELECT 
          scq.id,
          scq.school_college_id,
          scq.question_id,
          scq.year,
          sc.name AS school_college_name,
          q.question AS question_text,
          q.answer,
          q.des AS question_description,
          q.option1,
          q.option2,
          q.option3,
          q.option4,
          q.option5,
          q.image AS question_image,
          s.name AS subject_name,
          s.title AS subject_title,
          c.name AS chapter_name,
          c.title AS chapter_title
        FROM school_college_questions scq
        LEFT JOIN school_colleges sc ON scq.school_college_id = sc.id
        LEFT JOIN questions q ON scq.question_id = q.id
        LEFT JOIN subjects s ON q.subject_id = s.id
        LEFT JOIN chapters c ON q.chapter_id = c.id
        ORDER BY scq.id DESC
      `;

    return await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
    });
  }

  async findById(id) {
    const query = `
        SELECT 
          scq.id,
          scq.school_college_id,
          scq.question_id,
          scq.year,
          sc.name AS school_college_name,
          q.question AS question_text,
          q.answer,
          q.des AS question_description,
          q.option1,
          q.option2,
          q.option3,
          q.option4,
          q.option5,
          q.image AS question_image,
          s.name AS subject_name,
          s.title AS subject_title,
          c.name AS chapter_name,
          c.title AS chapter_title
        FROM school_college_questions scq
        LEFT JOIN school_colleges sc ON scq.school_college_id = sc.id
        LEFT JOIN questions q ON scq.question_id = q.id
        LEFT JOIN subjects s ON q.subject_id = s.id
        LEFT JOIN chapters c ON q.chapter_id = c.id
        WHERE scq.id = :id
        LIMIT 1
      `;

    const results = await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
      replacements: { id },
    });

    return results[0] || null;
  }
  async findBySchoolCollegeId(schoolCollegeId) {
    const query = `
        SELECT 
          scq.id,
          scq.school_college_id,
          scq.question_id,
          scq.year,
          sc.name AS school_college_name,
          q.question AS question_text,
          q.answer,
          q.des AS question_description,
          q.option1,
          q.option2,
          q.option3,
          q.option4,
          q.option5,
          q.image AS question_image,
          s.name AS subject_name,
          s.title AS subject_title,
          c.name AS chapter_name,
          c.title AS chapter_title
        FROM school_college_questions scq
        LEFT JOIN school_colleges sc ON scq.school_college_id = sc.id
        LEFT JOIN questions q ON scq.question_id = q.id
        LEFT JOIN subjects s ON q.subject_id = s.id
        LEFT JOIN chapters c ON q.chapter_id = c.id
        WHERE scq.school_college_id = :schoolCollegeId
        ORDER BY scq.year DESC, s.name, c.name
      `;

    return await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
      replacements: { schoolCollegeId },
    });
  }

  async findBySubjectAndChapter(subjectId, chapterId) {
    const query = `
        SELECT 
          scq.id,
          scq.school_college_id,
          scq.question_id,
          scq.year,
          sc.name AS school_college_name,
          q.question AS question_text,
          q.answer,
          q.des AS question_description,
          q.option1,
          q.option2,
          q.option3,
          q.option4,
          q.option5,
          q.image AS question_image,
          s.name AS subject_name,
          s.title AS subject_title,
          c.name AS chapter_name,
          c.title AS chapter_title
        FROM school_college_questions scq
        LEFT JOIN school_colleges sc ON scq.school_college_id = sc.id
        LEFT JOIN questions q ON scq.question_id = q.id
        LEFT JOIN subjects s ON q.subject_id = s.id
        LEFT JOIN chapters c ON q.chapter_id = c.id
        WHERE q.subject_id = :subjectId 
          AND q.chapter_id = :chapterId
        ORDER BY sc.name, scq.year DESC
      `;

    return await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
      replacements: { subjectId, chapterId },
    });
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

module.exports = SchoolCollegeQuestionRepository;
