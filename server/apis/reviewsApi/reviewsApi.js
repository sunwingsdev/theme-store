const express = require("express");
const { ObjectId } = require("mongodb");

const reviewsApi = (reviewsCollection) => {
  const router = express.Router();
  router.post("/", async (req, res) => {
    const reviewInfo = req.body;
    reviewInfo.createdAt = new Date();
    const result = await reviewsCollection.insertOne(reviewInfo);
    res.send(result);
  });

  router.get("/", async (req, res) => {
    const result = await reviewsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await reviewsCollection.deleteOne(query);
    res.send(result);
  });

  return router;
};
module.exports = reviewsApi;
