// models/UniversityQuestion.js
module.exports = (sequelize, DataTypes) => {
  const UniversityQuestion = sequelize.define(
    "UniversityQuestion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      university_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "university_questions",
    }
  );

  return UniversityQuestion;
};
