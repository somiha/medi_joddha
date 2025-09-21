// models/Topic.js
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chapter_id: {
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
      image: DataTypes.STRING,
    },
    {
      tableName: "topics",
    }
  );

  return Topic;
};
