// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body?.uploadFolder || "general";
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9]/g, "_");
    const destPath = path.join(uploadDir, sanitizedFolder);
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const prefix = req.body?.uploadFolder || "general";
    const cleanPrefix = prefix.replace(/[^a-zA-Z0-9]/g, "-");
    cb(
      null,
      `${cleanPrefix}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/i;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;

upload.multiUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "photos", maxCount: 10 },
]);
