const express = require("express");
const { ObjectId } = require("mongodb");

const coursesApi = (coursesCollection) => {
  const courseRouter = express.Router();

  //   add course
  courseRouter.post("/", async (req, res) => {
    const courseInfo = req.body;
    courseInfo.onlinePrice = parseFloat(courseInfo.onlinePrice);
    courseInfo.offlinePrice = parseFloat(courseInfo.offlinePrice);
    courseInfo.createdAt = new Date();
    const result = await coursesCollection.insertOne(courseInfo);
    res.send(result);
  });

  //   get all course
  courseRouter.get("/", async (req, res) => {
    const result = await coursesCollection.find().toArray();
    res.send(result);
  });

  // delete a course
  courseRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await coursesCollection.deleteOne(query);
    res.send(result);
  });

  // edit a course
  courseRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const courseInfo = req.body;
    const query = { _id: new ObjectId(id) };
    const time = new Date();
    const updatedDoc = {
      $set: {
        image: courseInfo?.image,
        courseName: courseInfo?.courseName,
        onlinePrice: parseFloat(courseInfo?.onlinePrice),
        offlinePrice: parseFloat(courseInfo?.offlinePrice),
        duration: courseInfo?.duration,
        schedule: courseInfo?.schedule,
        modifiedAt: time,
      },
    };
    const result = await coursesCollection.updateOne(query, updatedDoc);
    res.send(result);
  });

  return courseRouter;
};

module.exports = coursesApi;
