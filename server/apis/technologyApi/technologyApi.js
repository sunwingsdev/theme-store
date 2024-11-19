const express = require("express");
const { ObjectId } = require("mongodb");

const technologyApi = (technologiesCollection) => {
  const technologyRouter = express.Router();

  //add technology
  technologyRouter.post("/", async (req, res) => {
    const technologyInfo = req.body;
    technologyInfo.createdAt = new Date();
    const result = await technologiesCollection.insertOne(technologyInfo);
    res.send(result);
  });

  //   get all technologies
  technologyRouter.get("/", async (req, res) => {
    const result = await technologiesCollection.find().toArray();
    res.send(result);
  });

  // delete  a technology
  technologyRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await technologiesCollection.deleteOne(query);
    res.send(result);
  });
  return technologyRouter;
};

module.exports = technologyApi;
