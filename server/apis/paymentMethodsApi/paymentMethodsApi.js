const express = require("express");
const upload = require("../../utils/utils");
const path = require("path");
const { ObjectId } = require("mongodb");

const paymentMethodsApi = (paymentMethodsCollection) => {
  const paymentMethodRouter = express.Router();

  // Serve static files from the "uploads" directory
  paymentMethodRouter.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000"; // Default to localhost if not set

  //   add a payment method
  paymentMethodRouter.post(
    "/",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async (req, res) => {
      const paymentMethodInfo = req.body;
      paymentMethodInfo.image = req.files["image"]
        ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
        : undefined;
      paymentMethodInfo.isActive = true;
      paymentMethodInfo.createdAt = new Date();
      const result = await paymentMethodsCollection.insertOne(
        paymentMethodInfo
      );
      res.send(result);
    }
  );

  //   get all payment methods
  paymentMethodRouter.get("/", async (req, res) => {
    const result = await paymentMethodsCollection.find().toArray();
    res.send(result);
  });

  //  update payment method status
  paymentMethodRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const { isActive } = req.body;
    const updatedDoc = { $set: { isActive: isActive } };
    const result = await paymentMethodsCollection.updateOne(query, updatedDoc);
    res.send(result);
  });

  return paymentMethodRouter;
};
module.exports = paymentMethodsApi;
