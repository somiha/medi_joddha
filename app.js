// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

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
const universityRoutes = require("./routes/universityRoutes");
const universityQuestionRoutes = require("./routes/universityQuestionRoutes");

const programCoursesRoutes = require("./routes/programCourseRoutes");
const modelTestRoutes = require("./routes/modelTestRoutes");
const modelTestQuestionRoutes = require("./routes/modelTestQuestionRoutes");
const courseModelTestRoutes = require("./routes/courseModelTestRoutes");
const testTypeRoutes = require("./routes/testTypeRoutes");

const adminAuthRoutes = require("./routes/adminAuthRoutes");

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
app.use("/api/universities", universityRoutes);
app.use("/api/university-questions", universityQuestionRoutes);
app.use("/api/model-tests", modelTestRoutes);
app.use("/api/model-tests", modelTestQuestionRoutes);
app.use("/api/test-types", testTypeRoutes);

app.use("/api/programs", programCoursesRoutes);
app.use("/api/course-model-tests", courseModelTestRoutes);

app.use("/api/admin/auth", adminAuthRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Student API is running!");
});

module.exports = app;
