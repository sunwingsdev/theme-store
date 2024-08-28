require("dotenv").config(); // Load environment variables from .env file
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
// Ensure directories exist
fs.ensureDirSync("uploads/images/");
fs.ensureDirSync("uploads/zips/");

// Define storage for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
  },
});

// Define storage for ZIP files
const zipStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/zips/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
  },
});

// Create Multer instance for handling multiple file fields
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const dir =
        file.fieldname === "image" ? "uploads/images/" : "uploads/zips/";
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image" || file.fieldname === "file") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("Unexpected field"), false);
    }
  },
});

// Create an instance of multer for zip files
multer({ storage: zipStorage });

module.exports = upload;
