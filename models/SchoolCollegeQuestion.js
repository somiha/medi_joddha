// models/SchoolCollegeQuestion.js
module.exports = (sequelize, DataTypes) => {
  const SchoolCollegeQuestion = sequelize.define(
    "SchoolCollegeQuestion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      school_college_id: {
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
      tableName: "school_college_questions",
    }
  );

  return SchoolCollegeQuestion;
};
