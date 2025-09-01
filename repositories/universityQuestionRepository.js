// repositories/universityQuestionRepository.js
class UniversityQuestionRepository {
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

  async exists(university_id, question_id, year) {
    return await this.model.findOne({
      where: { university_id, question_id, year },
    });
  }

  async findAll() {
    const query = `
          SELECT 
            bq.id,
            bq.university_id,
            bq.question_id,
            bq.year,
            b.name AS university_name,
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
          FROM university_questions bq
          LEFT JOIN universities b ON bq.university_id = b.id
          LEFT JOIN questions q ON bq.question_id = q.id
          LEFT JOIN subjects s ON q.subject_id = s.id
          LEFT JOIN chapters c ON q.chapter_id = c.id
          ORDER BY bq.id DESC
        `;

    return await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
    });
  }

  async findById(id) {
    const query = `
          SELECT 
            bq.id,
            bq.university_id,
            bq.question_id,
            bq.year,
            b.name AS university_name,
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
          FROM university_questions bq
          LEFT JOIN universities b ON bq.university_id = b.id
          LEFT JOIN questions q ON bq.question_id = q.id
          LEFT JOIN subjects s ON q.subject_id = s.id
          LEFT JOIN chapters c ON q.chapter_id = c.id
          WHERE bq.id = :id
          LIMIT 1
        `;

    const results = await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
      replacements: { id },
    });

    return results[0] || null;
  }
  async findByUniversityId(universityId) {
    const query = `
          SELECT 
            bq.id,
            bq.university_id,
            bq.question_id,
            bq.year,
            b.name AS university_name,
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
          FROM university_questions bq
          LEFT JOIN universities b ON bq.university_id = b.id
          LEFT JOIN questions q ON bq.question_id = q.id
          LEFT JOIN subjects s ON q.subject_id = s.id
          LEFT JOIN chapters c ON q.chapter_id = c.id
          WHERE bq.university_id = :universityId
          ORDER BY bq.year DESC, s.name, c.name
        `;

    return await this.sequelize.query(query, {
      type: this.sequelize.constructor.QueryTypes.SELECT,
      replacements: { universityId },
    });
  }
  async findBySubjectAndChapter(subjectId, chapterId) {
    const query = `
          SELECT 
            bq.id,
            bq.university_id,
            bq.question_id,
            bq.year,
            b.name AS university_name,
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
          FROM university_questions bq
          LEFT JOIN universities b ON bq.university_id = b.id
          LEFT JOIN questions q ON bq.question_id = q.id
          LEFT JOIN subjects s ON q.subject_id = s.id
          LEFT JOIN chapters c ON q.chapter_id = c.id
          WHERE q.subject_id = :subjectId 
            AND q.chapter_id = :chapterId
          ORDER BY b.name, bq.year DESC
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

module.exports = UniversityQuestionRepository;
