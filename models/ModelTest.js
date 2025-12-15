// models/ModelTest.js
module.exports = (sequelize, DataTypes) => {
  const ModelTest = sequelize.define(
    "ModelTest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      start_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Scheduled start time for the test",
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Scheduled end time for the test",
      },
      total_rankings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "model_tests",
      timestamps: true,
    }
  );

  return ModelTest;
};
