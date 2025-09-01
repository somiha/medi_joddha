// models/ModelTestQuestion.js
module.exports = (sequelize, DataTypes) => {
  const ModelTestQuestion = sequelize.define(
    "ModelTestQuestion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      model_test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      marks: {
        type: DataTypes.DECIMAL(4, 2),
        defaultValue: 1.0,
      },
      time_seconds: {
        type: DataTypes.INTEGER,
        defaultValue: 60,
      },
      negative_marking_percent: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
        comment:
          "Percentage of marks deducted on wrong answer (e.g., 25% of 2.00 = 0.50)",
      },
    },
    {
      tableName: "model_test_questions",
      timestamps: true,
    }
  );

  return ModelTestQuestion;
};
