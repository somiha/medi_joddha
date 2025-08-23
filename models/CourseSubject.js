// models/CourseSubject.js
module.exports = (sequelize, DataTypes) => {
  const CourseSubject = sequelize.define(
    "CourseSubject",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "course_subject",
    }
  );

  return CourseSubject;
};
