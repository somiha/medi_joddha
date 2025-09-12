// models/ExamMaker.js
module.exports = (sequelize, DataTypes) => {
  const ExamMaker = sequelize.define(
    "ExamMaker",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      program_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number_of_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questions: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      question_types: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      given_answers: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      time_duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      right_answer: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      wrong_answer: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      skipped: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "exam_maker",
    }
  );

  return ExamMaker;
};
