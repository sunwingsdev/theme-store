const multer = require("multer");
const path = require("path");

// Unified storage configuration for images and ZIP files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "uploads/images/");
    } else if (file.fieldname === "file") {
      cb(null, "uploads/zips/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Allowed MIME types for images and ZIP files
const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
const allowedZipTypes = ["application/zip", "application/x-zip-compressed"];

// Multer instance with unified storage and fileFilter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image" && allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (file.fieldname === "file" && allowedZipTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."), false);
    }
  },
});

module.exports = upload;
