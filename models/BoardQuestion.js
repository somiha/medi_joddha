// models/BoardQuestion.js
module.exports = (sequelize, DataTypes) => {
  const BoardQuestion = sequelize.define(
    "BoardQuestion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      board_id: {
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
      tableName: "board_questions",
    }
  );

  return BoardQuestion;
};
