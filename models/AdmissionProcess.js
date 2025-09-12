// models/AdmissionProcess.js
module.exports = (sequelize, DataTypes) => {
  const AdmissionProcess = sequelize.define(
    "AdmissionProcess",
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

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "admission_processes",
    }
  );

  return AdmissionProcess;
};
