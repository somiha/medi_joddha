// models/University.js
module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define(
    "University",
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
      tableName: "universities",
    }
  );

  return University;
};
