// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const programRoutes = require("./routes/programRoutes");
const courseRoutes = require("./routes/courseRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const topicRoutes = require("./routes/topicRoutes");
const questionRoutes = require("./routes/questionRoutes");
const courseSubjectRoutes = require("./routes/courseSubjectRoutes");
const boardRoutes = require("./routes/boardRoutes");
const boardQuestionRoutes = require("./routes/boardQuestionRoutes");
const schoolCollegeRoutes = require("./routes/schoolCollegeRoutes");
const schoolCollegeQuestionRoutes = require("./routes/schoolCollegeQuestionRoutes");

const programCoursesRoutes = require("./routes/programCourseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/course-subject", courseSubjectRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/board-questions", boardQuestionRoutes);
app.use("/api/school-colleges", schoolCollegeRoutes);
app.use("/api/school-college-questions", schoolCollegeQuestionRoutes);

app.use("/api/programs", programCoursesRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Student API is running!");
});

module.exports = app;
