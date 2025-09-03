// models/DoubtClearQuestionAnswer.js
module.exports = (sequelize, DataTypes) => {
  const DoubtClearQuestionAnswer = sequelize.define(
    "DoubtClearQuestionAnswer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      doubtClearQuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doubt_clear_question_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "user_id",
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "teacher_id",
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "doubt_clear_question_answers",
      timestamps: true,
      underscored: true, // uses snake_case for fields
    }
  );

  // Optional: Define associations later
  // DoubtClearQuestionAnswer.associate = (models) => {
  //   models.DoubtClearQuestionAnswer.belongsTo(models.DoubtClearQuestion, { foreignKey: 'doubt_clear_question_id' });
  // };

  return DoubtClearQuestionAnswer;
};
