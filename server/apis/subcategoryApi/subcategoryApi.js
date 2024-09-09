const express = require("express");

const subcategoryApi = (subcategoriesCollection) => {
  const subcategoryRouter = express.Router();

  //add category
  subcategoryRouter.post("/", async (req, res) => {
    const subcategoryInfo = req.body;
    subcategoryInfo.createdAt = new Date();
    const result = await subcategoriesCollection.insertOne(subcategoryInfo);
    res.send(result);
  });

  //   get all categories
  subcategoryRouter.get("/", async (req, res) => {
    const result = await subcategoriesCollection.find().toArray();
    res.send(result);
  });
  return subcategoryRouter;
};

module.exports = subcategoryApi;
