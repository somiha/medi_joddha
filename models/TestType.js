// models/TestType.js
module.exports = (sequelize, DataTypes) => {
  const TestType = sequelize.define(
    "TestType",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "test_type",
    }
  );

  return TestType;
};
