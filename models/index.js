// models/index.js
const fs = require("fs");
const path = require("path");
const sequelize = require("../config/db");

const basename = path.basename(__filename);
const db = {};

// Load all model files
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    const modelName = file.split(".")[0];
    db[modelName] = model(sequelize, sequelize.Sequelize.DataTypes);
  });

db.sequelize = sequelize;

// Sync database
sequelize
  .sync({ alter: true }) // Auto creates or alters tables
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Failed to sync DB:", err));

module.exports = db;
