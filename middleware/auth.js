// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header: "Authorization: Bearer TOKEN"
  const authHeader = req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "No token, access denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded.user; // assuming your payload has { user: { id, role } }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
