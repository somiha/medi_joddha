// services/courseModelTestService.js
const CourseModelTestRepository = require("../repositories/courseModelTestRepository");
const db = require("../models");

class CourseModelTestService {
  constructor() {
    this.repo = new CourseModelTestRepository(db.CourseModelTest);
  }

  async validate(course_id, model_test_id, subject_id) {
    const course = await db.Course.findByPk(course_id);
    if (!course) throw new Error("Course not found");

    const modelTest = await db.ModelTest.findByPk(model_test_id);
    if (!modelTest) throw new Error("Model Test not found");

    if (subject_id) {
      const subject = await db.Subject.findByPk(subject_id);
      if (!subject) throw new Error("Subject not found");
    }
  }

  async add(course_id, model_test_id, name, duration_minutes, subject_id) {
    await this.validate(course_id, model_test_id, subject_id);

    const exists = await this.repo.exists(course_id, model_test_id);
    if (exists) {
      throw new Error("This model test is already linked to the course");
    }

    return await this.repo.create({
      course_id,
      model_test_id,
      name,
      duration_minutes: duration_minutes || 60,
      subject_id: subject_id || null,
    });
  }

  async addBulk(course_id, tests) {
    const records = [];

    for (const t of tests) {
      await this.validate(course_id, t.model_test_id, t.subject_id);

      const exists = await this.repo.exists(course_id, t.model_test_id);
      if (exists) continue;

      records.push({
        course_id,
        model_test_id: t.model_test_id,
        name: t.name,
        duration_minutes: t.duration_minutes || 60,
        subject_id: t.subject_id || null,
      });
    }

    return await this.repo.bulkCreate(records);
  }

  async getByCourseId(courseId) {
    const query = `
      SELECT 
        cmt.id,
        cmt.course_id,
        cmt.model_test_id,
        cmt.name AS link_name,
        cmt.duration_minutes,
        cmt.subject_id,
        s.name AS subject_name,
        cmt.created_at,
        mt.title,
        mt.year,
        mt.is_published,
        mt.is_archived,
        mt.type_id,
        tt.name AS type_name
      FROM course_model_tests cmt
      LEFT JOIN model_tests mt ON cmt.model_test_id = mt.id
      LEFT JOIN test_type tt ON mt.type_id = tt.id
      LEFT JOIN subjects s ON cmt.subject_id = s.id
      WHERE cmt.course_id = :courseId
      ORDER BY cmt.created_at DESC
    `;

    const [results] = await db.sequelize.query(query, {
      replacements: { courseId },
    });

    if (results.length === 0) {
      throw new Error("No model tests found for this course");
    }

    return results;
  }

  async getCoursesByModelTestId(modelTestId) {
    const query = `
      SELECT 
        cmt.id,
        cmt.course_id,
        cmt.model_test_id,
        cmt.name AS link_name,
        cmt.duration_minutes,
        cmt.subject_id,
        cmt.created_at,
        mt.type_id,
        tt.name AS type_name,
        mt.title,
        mt.year,
        mt.is_published,
        c.name AS course_name,
        c.title AS course_title,
        p.name AS program_name
      FROM course_model_tests cmt
      LEFT JOIN model_tests mt ON cmt.model_test_id = mt.id
      LEFT JOIN test_type tt ON mt.type_id = tt.id
      LEFT JOIN courses c ON cmt.course_id = c.id
      LEFT JOIN programs p ON c.program_id = p.id
      WHERE cmt.model_test_id = :modelTestId
      ORDER BY cmt.created_at DESC
    `;

    const [results] = await db.sequelize.query(query, {
      replacements: { modelTestId },
    });

    if (results.length === 0) {
      throw new Error("No courses are using this model test");
    }

    return results;
  }

  async remove(course_id, model_test_id) {
    const result = await this.repo.delete({
      course_id,
      model_test_id,
    });

    if (result === 0) {
      throw new Error("Link not found");
    }

    return { message: "Model test unlinked from course" };
  }
}

module.exports = CourseModelTestService;
