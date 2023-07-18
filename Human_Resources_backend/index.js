const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

//MongoDB Atlas
const uri =
  "mongodb+srv://saxena100parth:VIUOwOtoA6uanI1X@cluster0.zwkzcui.mongodb.net/?retryWrites=true&w=majority";

let userCollection;

// Connect to MongoDB Atlas
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  } else {
    console.log("Connected to MongoDB Atlas");

    userCollection = client.db("users-data").collection("UserData");

    // Close the MongoDB connection when the app terminates
    process.on("SIGINT", () => {
      client.close(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });
  }
});

// enable CORS and JSON parsing on requests
app.use(cors());
app.use(express.json());

//create a new user in the database
app.post("/users", async (req, res) => {
  console.log(req.body);
  const newUser = req.body;

  // Validate the request body
  if (!newUser.name || !newUser.email || !newUser.password) {
    return res
      .status(400)
      .json({ message: "Please Provide Name, Email, and Password" });
  }

  // Check if the user already exists
  const email = newUser.email;
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email Already Exists 😒" });
  }
  // creating a new user
  try {
    userCollection.insertOne(newUser, (err) => {
      if (err) {
        console.error("Error creating user", err);
        return res.status(500).json({ message: "Server error" });
      }

      console.log("User created Successfully😊");
      return res.status(201).json({ message: "User Created Successfully 😊" });
    });
  } catch (error) {
    console.log(error);
  }
});

// get all users from the database
app.get("/users", async (req, res) => {
  userCollection.find({}).toArray((err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Return the list of users as a JSON response
    return res.status(200).json({ users });
  });
});

app.listen(4000, () => console.log("Server running on port 4000"));
