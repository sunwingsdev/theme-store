const express = require("express");
const upload = require("../../utils/utils");
const path = require("path");

const controlVideoApi = (controlVideoCollection) => {
  const router = express.Router();

  // Serve static files from the "uploads" directory
  router.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000"; 

  router.post(
    "/",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async (req, res) => {
      const videoInfo = {
        page: req.body.page,
        subcategory: req.body.subcategory,
        videoLink: req.body.videoLink,
        createdAt: new Date(),
        image: req.files["image"]
          ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
          : undefined,
      };
      const result = await controlVideoCollection.insertOne(videoInfo);
      res.send(result);
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
