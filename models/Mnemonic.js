// models/Mnemonic.js
module.exports = (sequelize, DataTypes) => {
  const Mnemonic = sequelize.define(
    "Mnemonic",
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
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "mnemonics",
      timestamps: true,
    }
  );

  return Mnemonic;
};
