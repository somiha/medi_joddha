// models/DoubtClearQuestion.js
module.exports = (sequelize, DataTypes) => {
  const DoubtClearQuestion = sequelize.define(
    "DoubtClearQuestion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      programId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "doubt_clear_questions",
      timestamps: true,
    }
  );

  return DoubtClearQuestion;
};
