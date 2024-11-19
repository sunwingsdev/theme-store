const express = require("express");
const { ObjectId } = require("mongodb");
const upload = require("../../utils/utils");
const path = require("path");

const videosApi = (videosCollection) => {
  const videoRouter = express.Router();

  // Serve static files from the "uploads" directory
  videoRouter.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

  // add video Link
  videoRouter.post(
    "/",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async (req, res) => {
      const videoInfo = {
        thumbnail: req.files["image"]
          ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
          : undefined,
        videoLink: req.body.videoLink,
        createdAt: new Date(),
        isSelected: false,
      };
      const result = await videosCollection.insertOne(videoInfo);
      res.send(result);
    }
  );

  // get All videos
  videoRouter.get("/", async (req, res) => {
    const result = await videosCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  });

  videoRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const { isSelected } = req.body;
    const updatedDoc = { $set: { isSelected: isSelected } };
    const result = await videosCollection.updateOne(query, updatedDoc);
    res.send(result);
  });

  videoRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await videosCollection.deleteOne(query);
    res.send(result);
  });

  return videoRouter;
};

module.exports = videosApi;
