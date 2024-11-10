const express = require("express");

const reviewsApi = (reviewsCollection) => {
  const router = express.Router();
  router.post("/", async (req, res) => {
    const reviewInfo = req.body;
    reviewInfo.createdAt = new Date();
    const result = await reviewsCollection.insertOne(reviewInfo);
    res.send(result);
  });

  router.get("/", async (req, res) => {
    const result = await reviewsCollection.find().toArray();
    res.send(result);
  });

  return router;
};
module.exports = reviewsApi;
