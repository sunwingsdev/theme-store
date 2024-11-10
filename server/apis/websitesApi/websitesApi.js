const express = require("express");
const { ObjectId } = require("mongodb");
const upload = require("../../utils/utils");
const path = require("path");

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
      const query = { _id: new ObjectId(req.body.id) };
      const selectedWebsite = await websitesCollection.findOne(query);
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
          features: req.body.features
            ? req.body.features
            : selectedWebsite.features,
          singleLicensePrice: parseFloat(req.body.singleLicensePrice),
          unlimitedLicensePrice: parseFloat(req.body.unlimitedLicensePrice),
          details: req.body.details,
          image: req.files["image"]
            ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
            : selectedWebsite.image,
          zipFile: req.files["file"]
            ? `${serverUrl}/uploads/zips/${req.files["file"][0].filename}`
            : selectedWebsite.zipFile,
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
