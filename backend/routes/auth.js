const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserTemp.js");

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

// ==================== REGISTER ====================

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user
    await user.save();

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Registration Error:", error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

// ==================== LOGIN ====================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

   res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});

module.exports = router;