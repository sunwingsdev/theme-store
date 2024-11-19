const express = require("express");
const upload = require("../../utils/utils");
const path = require("path");

const controlVideoApi = (controlVideoCollection) => {
  const router = express.Router();

  // Serve static files from the "uploads" directory
  router.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

  // Define the fields to handle multiple file uploads
  router.post(
    "/",
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ]),
    async (req, res) => {

      if (!req.files || (!req.files.image && !req.files.file)) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // const imageFile = req.files.image ? req.files.image[0].filename : null;

      const videoInfo = {
        image: req.files["image"]
          ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
          : undefined,

        page: req.body.page,
        subcategory: req.body.subcategory,
        videoLink: req.body.videoLink,
        createdAt: new Date(),
      };
      // Save `videoInfo` to the database or handle further as needed
      const result = await controlVideoCollection.insertOne(videoInfo);
      res.json(result);
    }
  );

  router.get("/", async (req, res) => {
    const result = await controlVideoCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  });

  return router;
};

module.exports = controlVideoApi;
