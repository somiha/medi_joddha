// models/examhistory.js
module.exports = (sequelize, DataTypes) => {
  const ExamHistory = sequelize.define(
    "ExamHistory",
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
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_board: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      total_time_taken: {
        type: DataTypes.INTEGER, // in seconds
        allowNull: false,
      },
      question_answers: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      num_of_correct: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      num_of_attempt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      num_of_wrong: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "exam_histories",
      timestamps: true,
      underscored: true,
    }
  );

  return ExamHistory;
};
