// services/courseSubjectService.js
const CourseSubjectRepository = require("../repositories/courseSubjectRepository");
const db = require("../models");

class CourseSubjectService {
  constructor() {
    this.courseSubjectRepository = new CourseSubjectRepository(
      db.CourseSubject
    );
  }

  async add(courseId, subjectId) {
    const course = await db.Course.findByPk(courseId);
    if (!course) throw new Error("Course not found");

    const subject = await db.Subject.findByPk(subjectId);
    if (!subject) throw new Error("Subject not found");

    const exists = await this.courseSubjectRepository.exists(
      courseId,
      subjectId
    );
    if (exists) throw new Error("This subject is already linked to the course");

    return await this.courseSubjectRepository.create({
      course_id: courseId,
      subject_id: subjectId,
    });
  }

  async getAll(query) {
    const { course_id, subject_id } = query;
    const where = {};

    if (course_id) where.course_id = course_id;
    if (subject_id) where.subject_id = subject_id;

    return await this.courseSubjectRepository.findAll(where);
  }

  async getByCourseId(courseId) {
    return await this.courseSubjectRepository.findByCourseId(courseId);
  }

  async getBySubjectId(subjectId) {
    return await this.courseSubjectRepository.findBySubjectId(subjectId);
  }

  async remove(courseId, subjectId) {
    const record = await this.courseSubjectRepository.delete({
      course_id: courseId,
      subject_id: subjectId,
    });
    if (!record) throw new Error("Mapping not found");
    return record;
  }
}

module.exports = CourseSubjectService;
