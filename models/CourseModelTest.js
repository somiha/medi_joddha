// models/CourseModelTest.js
module.exports = (sequelize, DataTypes) => {
  const CourseModelTest = sequelize.define(
    "CourseModelTest",
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
      model_test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Optional: Subject this test is associated with in the course",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment:
          "Custom name for this test in the course (e.g., 'Math Weekly Test')",
      },
      duration_minutes: {
        type: DataTypes.INTEGER,
        defaultValue: 60,
        comment: "Duration of the test in minutes",
      },
    },
    {
      tableName: "course_model_tests",
      timestamps: true,
    }
  );

  return CourseModelTest;
};
