const express = require("express");
const upload = require("../../utils/utils");
const path = require("path");

const controlLogoApi = (controlLogoCollection) => {
  const router = express.Router();

  // Serve static files from the "uploads" directory
  router.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Get the server URL from environment variables
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

  router.post(
    "/",
    upload.fields([{ name: "image", maxCount: 1 }]),
    async (req, res) => {
      try {
        const logoInfo = {
          page: req.body.page,
          subcategory: req.body.subcategory,
          createdAt: new Date(),
          logo: req.files["image"]
            ? `${serverUrl}/uploads/images/${req.files["image"][0].filename}`
            : undefined,
        };
        const result = await controlLogoCollection.insertOne(logoInfo);
        res.send(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );

  router.get("/", async (req, res) => {
    try {
      const result = await controlLogoCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};

module.exports = controlLogoApi;
