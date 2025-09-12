// models/LiveTestResult.js
module.exports = (sequelize, DataTypes) => {
  const LiveTestResult = sequelize.define(
    "LiveTestResult",
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
      test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      marks: {
        type: DataTypes.FLOAT,
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
      tableName: "live_test_results",
    }
  );

  return LiveTestResult;
};
