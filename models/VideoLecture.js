// models/VideoLecture.js
module.exports = (sequelize, DataTypes) => {
  const VideoLecture = sequelize.define(
    "VideoLecture",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: { isUrl: true },
      },
      course: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "video_lectures",
      timestamps: true,
    }
  );

  return VideoLecture;
};
