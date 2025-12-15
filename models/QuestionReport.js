// models/questionReport.js
module.exports = (sequelize, DataTypes) => {
  const QuestionReport = sequelize.define(
    "QuestionReport",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      report: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      status: {
        type: DataTypes.ENUM("pending", "accepted", "declined"),
        defaultValue: "pending",
      },
      reported_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "question_reports",
      timestamps: true,
      underscored: true,
    }
  );

  return QuestionReport;
};
