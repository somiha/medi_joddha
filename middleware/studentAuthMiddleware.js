// middleware/studentAuthMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    if (req?.user?.type !== "student") {
      return res.status(403).json({ error: "Access denied: Students only" });
    }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
