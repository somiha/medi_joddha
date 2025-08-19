// server.js
const app = require("./app");
const sequelize = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
});
