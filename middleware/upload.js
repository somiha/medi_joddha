// // middleware/upload.js
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadDir = "./uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {

//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {

//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, `${uniqueSuffix}${ext}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/i;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);
//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
//   }
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 500 * 1024 * 1024 },
//   fileFilter,
// });

// upload.multiUpload = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "photos", maxCount: 10 },
// ]);

// const uploadQuestionImage = upload.single("question_image");
// const uploadAnswerImage = upload.single("answer_image");
// const uploadDesImage = upload.single("des_image");
// const uploadOption1Image = upload.single("option1_image");
// const uploadOption2Image = upload.single("option2_image");
// const uploadOption3Image = upload.single("option3_image");
// const uploadOption4Image = upload.single("option4_image");
// const uploadOption5Image = upload.single("option5_image");

// module.exports = {

//   upload,

//   uploadQuestionImage,
//   uploadAnswerImage,
//   uploadDesImage,
//   uploadOption1Image,
//   uploadOption2Image,
//   uploadOption3Image,
//   uploadOption4Image,
//   uploadOption5Image,

//   uploadAny: upload.any(),
//   uploadArray: (field, maxCount) => upload.array(field, maxCount),

//   uploadImage: upload.single("image"),
//   multiUpload: upload.multiUpload,
// };

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
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const imageTypes = /jpeg|jpg|png|webp/i;
  const videoTypes = /mp4|webm|ogg|mov/i;

  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (
    (imageTypes.test(ext) && imageTypes.test(mimetype)) ||
    (videoTypes.test(ext) && videoTypes.test(mimetype))
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images (jpeg, jpg, png, webp) and videos (mp4, webm, mov) are allowed"
      )
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter,
});
upload.multiUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "photos", maxCount: 10 },
]);
const uploadVideo = upload.single("video");

const uploadQuestionImage = upload.single("question_image");
const uploadAnswerImage = upload.single("answer_image");
const uploadDesImage = upload.single("des_image");
const uploadOption1Image = upload.single("option1_image");
const uploadOption2Image = upload.single("option2_image");
const uploadOption3Image = upload.single("option3_image");
const uploadOption4Image = upload.single("option4_image");
const uploadOption5Image = upload.single("option5_image");

module.exports = {
  upload,

  uploadQuestionImage,
  uploadAnswerImage,
  uploadDesImage,
  uploadOption1Image,
  uploadOption2Image,
  uploadOption3Image,
  uploadOption4Image,
  uploadOption5Image,

  uploadVideo,

  uploadAny: upload.any(),
  uploadArray: (field, maxCount) => upload.array(field, maxCount),
  uploadImage: upload.single("image"),
  multiUpload: upload.multiUpload,
};
