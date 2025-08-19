// utils/fileHelper.js
const fs = require("fs").promises;
const path = require("path");

exports.deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const urlPath = new URL(imageUrl, "http://localhost").pathname;
    const filename = path.basename(urlPath);
    const filePath = path.join(__dirname, "..", "uploads", filename);

    await fs.access(filePath);
    await fs.unlink(filePath);
    console.log(`🗑️ Deleted image: ${filePath}`);
  } catch (err) {
    console.log(`❌ Failed to delete image: ${imageUrl}`, err.message);
  }
};
