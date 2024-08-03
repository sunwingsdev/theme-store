const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// import api modules

const admissionApi = require("./apis/admissionApi/admissionApi");
const usersApi = require("./apis/usersApi/usersApi");
const queriesApi = require("./apis/queriesApi/queryApi");
const coursesApi = require("./apis/coursesApi/coursesApi");
const websitesApi = require("./apis/websitesApi/websitesApi");

const corsConfig = {
  origin: [
    "http://localhost:5173",
    "https://rabbitcode.org",
    "http://rabbitcode.org",
    "www.rabbitcode.org",
    "rabbitcode.org",
    "*",
  ],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

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
    const websitesCollection = client
      .db("training-admission")
      .collection("websites");
    // collection ends here--------

    // api start here-------
    app.use("/admission", admissionApi(admissionCollection));
    app.use("/users", usersApi(usersCollection));
    app.use("/query", queriesApi(queriesCollection));
    app.use("/courses", coursesApi(coursesCollection));
    app.use("/websites", websitesApi(websitesCollection));
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
