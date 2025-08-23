// models/SchoolCollege.js
module.exports = (sequelize, DataTypes) => {
  const SchoolCollege = sequelize.define(
    "SchoolCollege",
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
      tableName: "school_colleges",
    }
  );

  return SchoolCollege;
};
