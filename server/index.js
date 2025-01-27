require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// CORS middleware setup
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware to parse JSON requests
app.use(express.json());

const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error in connecting with the database:", error);
  });

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// User Model
const User = mongoose.model("User", userSchema);

// JWT Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};

// Signup Route
app.post("/signup", async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  if (!FirstName || !LastName || !Email || !Password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email: Email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({
      name: `${FirstName} ${LastName}`,
      email: Email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ message: "Signup successful" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send({ message: "An error occurred during signup" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email: Email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(Password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({ message: "Signin successful", token });
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).send({ message: "An error occurred during signin" });
  }
});

// Test Route (Protected)
app.get("/protected", authMiddleware, (req, res) => {
  res.send(`Hello ${req.user.email}, you are authorized!`);
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
