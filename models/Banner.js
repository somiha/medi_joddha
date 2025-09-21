// models/Banner.js
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define(
    "Banner",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "banners",
      timestamps: true,
    }
  );

  return Banner;
};
