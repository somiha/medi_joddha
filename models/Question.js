// models/Question.js
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
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
      chapter_id: DataTypes.INTEGER,
      topic_id: DataTypes.INTEGER,
      book_ref_id: DataTypes.INTEGER,
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question_image: DataTypes.STRING,
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer_image: DataTypes.STRING,
      des: DataTypes.TEXT,
      des_image: DataTypes.STRING,
      is_draft: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      image: DataTypes.STRING,
      option1: DataTypes.STRING,
      option2: DataTypes.STRING,
      option3: DataTypes.STRING,
      option4: DataTypes.STRING,
      option5: DataTypes.STRING,

      option1_image: DataTypes.STRING,
      option2_image: DataTypes.STRING,
      option3_image: DataTypes.STRING,
      option4_image: DataTypes.STRING,
      option5_image: DataTypes.STRING,
    },
    {
      tableName: "questions",
    }
  );

  return Question;
};
