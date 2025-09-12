// models/MedicalCollege.js
module.exports = (sequelize, DataTypes) => {
  const MedicalCollege = sequelize.define(
    "MedicalCollege",
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
      short_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      banner_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photos: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      established_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "City or area",
      },
    },
    {
      tableName: "medical_colleges",
      timestamps: true,
    }
  );

  return MedicalCollege;
};
