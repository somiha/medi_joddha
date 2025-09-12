// models/AdmissionNotice.js
module.exports = (sequelize, DataTypes) => {
  const AdmissionNotice = sequelize.define(
    "AdmissionNotice",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "e.g., 'Medical Admission Notice 2025'",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Full notice content",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Optional banner image",
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Year of the notice (e.g., 2025)",
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Is this notice visible to users?",
      },
    },
    {
      tableName: "admission_notices",
      timestamps: true,
    }
  );

  return AdmissionNotice;
};
