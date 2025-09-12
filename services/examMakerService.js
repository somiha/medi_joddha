// services/examMakerService.js
const ExamMakerRepository = require("../repositories/examMakerRepository");
const db = require("../models");

class ExamMakerService {
  constructor() {
    this.repo = new ExamMakerRepository(db.ExamMaker);
  }

  async generateRandomQuestions(subject_id, count) {
    const questions = await db.Question.findAll({
      where: { subject_id },
      limit: count,
      order: db.sequelize.random(),
    });

    if (questions.length === 0) {
      throw new Error("No questions found for this subject");
    }

    return questions.slice(0, count).map((q) => ({
      id: q.id,
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      option5: q.option5,
      image: q.image,
      type: q.type,
      answer: q.answer,
    }));
  }

  async createExam(data) {
    const {
      user_id,
      program_id,
      course_id,
      subject_id,
      number_of_questions,
      time_duration,
    } = data;

    if (
      !user_id ||
      !program_id ||
      !course_id ||
      !subject_id ||
      !number_of_questions
    ) {
      throw new Error("All fields are required");
    }

    const user = await db.User.findByPk(user_id);
    if (!user) throw new Error("User not found");

    const program = await db.Program.findByPk(program_id);
    if (!program) throw new Error("Program not found");

    const course = await db.Course.findByPk(course_id);
    if (!course) throw new Error("Course not found");

    const subject = await db.Subject.findByPk(subject_id);
    if (!subject) throw new Error("Subject not found");

    const questions = await this.generateRandomQuestions(
      subject_id,
      number_of_questions
    );

    return await this.repo.create({
      user_id,
      program_id,
      course_id,
      subject_id,
      number_of_questions,
      questions,
      question_types: data.question_types || "random",
      time_duration: time_duration || null,
      given_answers: {},
      right_answer: 0,
      wrong_answer: 0,
      skipped: 0,
    });
  }

  async getById(id) {
    const exam = await this.repo.findById(id);
    if (!exam) throw new Error("Exam not found");
    return exam;
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getByUserId(user_id) {
    const exams = await this.repo.findByUserId(user_id);
    if (exams.length === 0) {
      throw new Error("No exams found for this user");
    }
    return exams;
  }

  async submitAnswers(examId, given_answers, time_taken) {
    const exam = await this.repo.findById(examId);
    if (!exam) throw new Error("Exam not found");

    if (exam.given_answers && Object.keys(exam.given_answers).length > 0) {
      throw new Error("Answers already submitted");
    }

    let right = 0,
      wrong = 0,
      skipped = 0;
    const results = {};

    for (const q of exam.questions) {
      const userAnswer = given_answers[q.id];
      const correctAnswer = q.answer;
      if (userAnswer === undefined || userAnswer === null) {
        skipped++;
        results[q.id] = {
          given: null,
          correct: correctAnswer,
          status: "skipped",
        };
      } else if (userAnswer.toString() === correctAnswer.toString()) {
        right++;
        results[q.id] = {
          given: userAnswer,
          correct: correctAnswer,
          status: "correct",
        };
      } else {
        wrong++;
        results[q.id] = {
          given: userAnswer,
          correct: correctAnswer,
          status: "wrong",
        };
      }
    }

    return await exam.update({
      given_answers: results,
      time_duration: time_taken || exam.time_duration,
      right_answer: right,
      wrong_answer: wrong,
      skipped: skipped,
    });
  }

  async delete(id) {
    const exam = await this.repo.findById(id);
    if (!exam) throw new Error("Exam not found");

    await exam.destroy();
    return { message: "Exam deleted successfully" };
  }
}

module.exports = ExamMakerService;
