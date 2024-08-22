const express = require("express");
const { ObjectId } = require("mongodb");

const websitesApi = (websitesCollection) => {
  const websiteRouter = express.Router();

  //   add website
  websiteRouter.post("/", async (req, res) => {
    const websiteInfo = req.body;
    websiteInfo.singleLicensePrice = parseFloat(websiteInfo.singleLicensePrice);
    websiteInfo.unlimitedLicensePrice = parseFloat(
      websiteInfo.unlimitedLicensePrice
    );
    websiteInfo.createdAt = new Date();
    const result = await websitesCollection.insertOne(websiteInfo);
    res.send(result);
  });

  //   get all websites
  websiteRouter.get("/", async (req, res) => {
    const result = await websitesCollection.find().toArray();
    res.send(result);
  });

  // delete a website
  websiteRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await websitesCollection.deleteOne(query);
    res.send(result);
  });

  return websiteRouter;
};

module.exports = websitesApi;
