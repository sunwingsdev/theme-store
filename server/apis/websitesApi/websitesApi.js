const express = require("express");

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

  return websiteRouter;
};

module.exports = websitesApi;
