// models/BookRef.js
module.exports = (sequelize, DataTypes) => {
  const BookRef = sequelize.define(
    "BookRef",
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
      image: DataTypes.STRING,
    },
    {
      tableName: "book_refs",
    }
  );

  return BookRef;
};
