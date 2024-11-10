const express = require("express");

const categoryApi = (categoriesCollection) => {
  const categoryRouter = express.Router();

  //add category
  categoryRouter.post("/", async (req, res) => {
    const categoryInfo = req.body;
    categoryInfo.createdAt = new Date();
    const result = await categoriesCollection.insertOne(categoryInfo);
    res.send(result);
  });

  //   get all categories
  categoryRouter.get("/", async (req, res) => {
    const result = await categoriesCollection.find().toArray();
    res.send(result);
  });
  return categoryRouter;
};

module.exports = categoryApi;
