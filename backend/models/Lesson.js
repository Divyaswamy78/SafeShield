const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  },

  icon: {
    type: String,
    default: "📚"
  },

  description: {
    type: String,
    required: true
  },

  points: {
    type: [String],
    default: []
  }
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;