// models/SocialMedia.js
module.exports = (sequelize, DataTypes) => {
  const SocialMedia = sequelize.define(
    "SocialMedia",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      tableName: "social_media",
      timestamps: true,
    }
  );

  return SocialMedia;
};
