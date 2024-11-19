const express = require("express");
const { ObjectId } = require("mongodb");
const upload = require("../../utils/utils");
const path = require("path");

const ordersApi = (ordersCollection) => {
  const ordersRouter = express.Router();
  // Serve static files from the "uploads" directory
  ordersRouter.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

  ordersRouter.post(
    "/",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async (req, res) => {
      const ordersInfo = req.body;
      ordersInfo.createdAt = new Date();
      ordersInfo.status = "pending";
      const screenshot = req.files["image"]
        ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
        : undefined;
      ordersInfo.paymentInputs = ordersInfo.paymentInputs
        ? JSON.parse(ordersInfo.paymentInputs)
        : [];
      if (screenshot) {
        ordersInfo.paymentInputs.push({ screenshot });
      }
      const result = await ordersCollection.insertOne(ordersInfo);
      res.send(result);
    }
  );

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
