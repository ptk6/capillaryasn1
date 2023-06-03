const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/rewards";

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
// mongoose
//   .connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const checkUserExists = async (req, res, next) => {
  const { username } = req.body;

  // Check if the user already exists
  const user = await User.findOne({ username });
  if (user) {
    res.status(400).json({ error: "Username already exists" });
    return;
  }
  next();
};

app.post("/register", checkUserExists, async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error inserting user into MongoDB:", err);
    res.status(500).json({ error: "Failed to insert user into the database" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error finding user in MongoDB:", err);
    res.status(500).json({ error: "Failed to find user in the database" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
