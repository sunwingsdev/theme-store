const express = require("express");
const { ObjectId } = require("mongodb");
const path = require("path");
const upload = require("../../utils/utils");

const usersApi = (usersCollection) => {
  const userRouter = express.Router();

  // Serve static files from the "uploads" directory
  userRouter.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000"; // Default to localhost if not set

  userRouter.post(
    "/",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async (req, res) => {
      const userInfo = {
        name: req.body?.name,
        uid: req.body?.uid,
        email: req.body?.email,
        createdAt: new Date(),
        role: "user",
        image: req.files["image"]
          ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
          : undefined,
      };

      console.log(userInfo);

      const result = await usersCollection.insertOne(userInfo);
      result.image = userInfo.image;
      res.send(result);
    }
  );

  userRouter.get("/", async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
  });

  userRouter.get("/:uid", async (req, res) => {
    const { uid } = req.params;
    const query = { uid: uid };
    const result = await usersCollection.findOne(query);
    res.send(result);
  });

  userRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const info = req.body;
    const updatedDoc = { $set: { role: info.role } };
    const result = await usersCollection.updateOne(query, updatedDoc);
    res.send(result);
  });

  return userRouter;
};

module.exports = usersApi;
