// models/questionFavorite.js
module.exports = (sequelize, DataTypes) => {
  const QuestionFavorite = sequelize.define(
    "QuestionFavorite",
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
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "question_favorites",
      timestamps: true,
      underscored: true,
    }
  );

  return QuestionFavorite;
};
