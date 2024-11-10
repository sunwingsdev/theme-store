const multer = require('multer');
const path = require('path');

// Define storage for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Define storage for ZIP files
const zipStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/zips/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Allowed MIME types for images and ZIP files
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
const allowedZipTypes = ['application/zip', 'application/x-zip-compressed'];

// Create Multer instance
const upload = multer({
  storage: function (req, file, cb) {
    // Determine the destination based on the field name
    const dir = file.fieldname === 'image' ? imageStorage : zipStorage;
    cb(null, dir);
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image') {
      if (allowedImageTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
      } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
      }
    } else if (file.fieldname === 'file') {
      if (allowedZipTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
      } else {
        cb(new Error('Invalid file type. Only ZIP files are allowed.'), false);
      }
    } else {
      cb(new multer.MulterError('Unexpected field'), false);
    }
  },
});

// Export the upload instance for use in routes
module.exports = upload;
