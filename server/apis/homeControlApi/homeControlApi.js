const express = require("express");
const { ObjectId } = require("mongodb");

const homeControlApi = (homeControlCollection) => {
  const router = express.Router();
  // add Home Control

  router.post("/", async (req, res) => {
    const controlInfo = req.body;
    controlInfo.createdAt = new Date();
    const result = await homeControlCollection.insertOne(controlInfo);
    res.send(result);
  });

  router.get("/", async (req, res) => {
    const result = await homeControlCollection.find().toArray();
    res.send(result);
  });

  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const controlInfo = req.body;
    const query = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: {
        text: controlInfo?.text,
        fontSize: controlInfo?.fontSize,
        textColor: controlInfo?.textColor,
        backgroundColor: controlInfo?.backgroundColor,
        category: controlInfo?.category,
        subcategory: controlInfo?.subcategory,
        modifiedAt: new Date(),
      },
    };
    const result = await homeControlCollection.updateOne(query, updatedDoc);
    res.send(result);
  });
  return router;
};

module.exports = homeControlApi;
