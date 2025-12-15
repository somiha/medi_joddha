// models/AppGuideline.js
module.exports = (sequelize, DataTypes) => {
  const AppGuideline = sequelize.define(
    "AppGuideline",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      video: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      video_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: "app_guidelines",
      timestamps: true,
    }
  );

  return AppGuideline;
};
