const express = require("express");
const { ObjectId } = require("mongodb");

const ordersApi = (ordersCollection) => {
  const ordersRouter = express.Router();

  // add an order
  ordersRouter.post("/", async (req, res) => {
    const ordersInfo = req.body;
    ordersInfo.createdAt = new Date();
    ordersInfo.status = "pending";
    const result = await ordersCollection.insertOne(ordersInfo);
    res.send(result);
  });

  //   get all orders
  ordersRouter.get("/", async (req, res) => {
    const result = await ordersCollection.find().toArray();
    res.send(result);
  });

  // update status
  ordersRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: { status: "completed" },
    };
    const result = await ordersCollection.updateOne(query, updatedDoc);
    res.send(result);
  });

  // delete order
  ordersRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await ordersCollection.deleteOne(query);
    res.send(result);
  });

  return ordersRouter;
};
module.exports = ordersApi;
