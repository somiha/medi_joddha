// models/Chapter.js
module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define(
    "Chapter",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_des: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      serial_id: {
        type: DataTypes.INTEGER,
      },
      image: DataTypes.STRING,
    },
    {
      tableName: "chapters",
    }
  );

  return Chapter;
};
