// models/Program.js
module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    "Program",
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
      tableName: "programs",
    }
  );

  return Program;
};
