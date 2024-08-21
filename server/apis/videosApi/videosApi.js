const express = require("express");
const { ObjectId } = require("mongodb");

const videosApi = (videosCollection) => {
  const videoRouter = express.Router();

  // add video Link
  videoRouter.post("/", async (req, res) => {
    const videoInfo = req.body;
    videoInfo.createdAt = new Date();
    videoInfo.isSelected = false;
    const result = await videosCollection.insertOne(videoInfo);
    res.send(result);
  });

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
