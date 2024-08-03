const express = require("express");

const coursesApi = (coursesCollection) => {
  const courseRouter = express.Router();

  //   add course
  courseRouter.post("/", async (req, res) => {
    const courseInfo = req.body;
    courseInfo.singleLicensePrice = parseFloat(courseInfo.singleLicensePrice);
    courseInfo.unlimitedLicensePrice = parseFloat(
      courseInfo.unlimitedLicensePrice
    );
    courseInfo.createdAt = new Date();
    const result = await coursesCollection.insertOne(courseInfo);
    res.send(result);
  });

  //   get all course
  courseRouter.get("/", async (req, res) => {
    const result = await coursesCollection.find().toArray();
    res.send(result);
  });

  return courseRouter;
};

module.exports = coursesApi;
