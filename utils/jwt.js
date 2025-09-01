// utils/jwt.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (userInfo) => {
  return jwt.sign({ ...userInfo }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
