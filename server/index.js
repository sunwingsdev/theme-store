const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");

// import api modules

const admissionApi = require("./apis/admissionApi/admissionApi");
const usersApi = require("./apis/usersApi/usersApi");
const queriesApi = require("./apis/queriesApi/queryApi");
const coursesApi = require("./apis/coursesApi/coursesApi");
const websitesApi = require("./apis/websitesApi/websitesApi");
const videosApi = require("./apis/videosApi/videosApi");
const ordersApi = require("./apis/ordersApi/ordersApi");
const categoryApi = require("./apis/categoryApi/categoryApi");
const subcategoryApi = require("./apis/subcategoryApi/subcategoryApi");
const homeControlApi = require("./apis/homeControlApi/homeControlApi");
const controlVideoApi = require("./apis/controlVideoApi/controlVideoApi");
const controlLogoApi = require("./apis/controlLogoApi/controlLogoApi");
const reviewsApi = require("./apis/reviewsApi/reviewsApi");

const corsConfig = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://rabbitcode.org",
    "http://rabbitcode.org",
    "www.rabbitcode.org",
    "rabbitcode.org",
    "https://betweb.oracletechnology.net",
    "http://betweb.oracletechnology.net",
    "www.betweb.oracletechnology.net",
    "betweb.oracletechnology.net",
    "*",
  ],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// middlewares
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //  collection starts here-----
    const admissionCollection = client
      .db("training-admission")
      .collection("admission");
    const usersCollection = client.db("training-admission").collection("users");
    const queriesCollection = client
      .db("training-admission")
      .collection("queries");
    const coursesCollection = client
      .db("training-admission")
      .collection("courses");
    // collection ends here--------
    const websitesCollection = client
      .db("training-admission")
      .collection("websites");
    const videosCollection = client
      .db("training-admission")
      .collection("videos");
    const ordersCollection = client
      .db("training-admission")
      .collection("orders");
    const categoriesCollection = client
      .db("training-admission")
      .collection("categories");
    const subcategoriesCollection = client
      .db("training-admission")
      .collection("subcategories");
    const homeControlsCollection = client
      .db("training-admission")
      .collection("homeControls");
    const controlVideoCollection = client
      .db("training-admission")
      .collection("controlVideos");
    const controlLogoCollection = client
      .db("training-admission")
      .collection("controlLogos");
    const reviewsCollection = client
      .db("training-admission")
      .collection("reviews");

    // api start here-------
    app.use("/admission", admissionApi(admissionCollection));
    app.use("/users", usersApi(usersCollection));
    app.use("/query", queriesApi(queriesCollection));
    app.use("/courses", coursesApi(coursesCollection));
    app.use("/websites", websitesApi(websitesCollection));
    app.use("/videos", videosApi(videosCollection));
    app.use("/orders", ordersApi(ordersCollection));
    app.use("/category", categoryApi(categoriesCollection));
    app.use("/subcategory", subcategoryApi(subcategoriesCollection));
    app.use("/home-control", homeControlApi(homeControlsCollection));
    app.use("/control-videos", controlVideoApi(controlVideoCollection));
    app.use("/control-logos", controlLogoApi(controlLogoCollection));
    app.use("/reviews", reviewsApi(reviewsCollection));
    // api ends here--------

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!!!✅");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// basic setup
app.get("/", (req, res) => {
  res.send("Theme store server is Running.");
});

app.listen(port, () => {
  console.log(`Theme store server is Running on PORT:🆗 ${port}`);
});
