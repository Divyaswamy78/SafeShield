const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // User Role
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  // Learning Progress
  completedLessons: {
    type: [String],
    default: []
  },

  // Quiz Progress
  quizScore: {
    type: Number,
    default: 0
  },

  quizAttempts: {
    type: Number,
    default: 0
  },

  // Achievements
  badges: {
    type: [String],
    default: []
  },

  // Certificate
  certificateUnlocked: {
    type: Boolean,
    default: false
  },

  certificateDate: {
    type: Date,
    default: null
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;