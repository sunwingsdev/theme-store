require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const { ObjectId } = require("mongodb");

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

const websitesApi = (websitesCollection) => {
  const websiteRouter = express.Router();

  // Serve static files from the "uploads" directory
  websiteRouter.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000"; // Default to localhost if not set

  // Add website
  websiteRouter.post(
    "/",
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ]),
    async (req, res) => {
      console.log("Body:", req.body); // Form fields
      console.log("Files:", req.files); // Uploaded files
      const time = new Date();
      const websiteInfo = {
        title: req.body.title,
        category: req.body.category,
        technology: req.body.technology,
        tutorialLink: req.body.tutorialLink,
        demoFrontend: req.body.demoFrontend,
        demoBackend: req.body.demoBackend,
        createdAt: time,
        features: req.body.features,
        singleLicensePrice: parseFloat(req.body.singleLicensePrice),
        unlimitedLicensePrice: parseFloat(req.body.unlimitedLicensePrice),
        details: req.body.details,
        image: req.files["image"]
          ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
          : undefined,
        zipFile: req.files["file"]
          ? `${serverUrl}/uploads/zips/${req.files["file"][0].filename}`
          : undefined,
      };

      try {
        const result = await websitesCollection.insertOne(websiteInfo);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to add website" });
      }
    }
  );

  // Get all websites
  websiteRouter.get("/", async (req, res) => {
    const result = await websitesCollection.find().toArray();
    res.send(result);
  });

  // Delete a website
  websiteRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await websitesCollection.deleteOne(query);
    res.send(result);
  });

  // Edit a website
  websiteRouter.patch(
    "/:id",
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ]),
    async (req, res) => {
      console.log(req.body, req.files);
      const query = { _id: new ObjectId(req.body.id) };
      if (!req.files) {
        return res.status(400).send({ error: "No files were uploaded." });
      }

      const time = new Date();
      const updatedDoc = {
        $set: {
          title: req.body.title,
          category: req.body.category,
          technology: req.body.technology,
          tutorialLink: req.body.tutorialLink,
          demoFrontend: req.body.demoFrontend,
          demoBackend: req.body.demoBackend,
          createdAt: time,
          features: req.body.features,
          singleLicensePrice: parseFloat(req.body.singleLicensePrice),
          unlimitedLicensePrice: parseFloat(req.body.unlimitedLicensePrice),
          details: req.body.details,
          image: req.files["image"]
            ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
            : undefined,
          zipFile: req.files["file"]
            ? `${serverUrl}/uploads/zips/${req.files["file"][0].filename}`
            : undefined,
          modifiedAt: time,
        },
      };

      const result = await websitesCollection.updateOne(query, updatedDoc);
      res.send(result);
    }
  );

  return websiteRouter;
};

module.exports = websitesApi;
