const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length === 4
      },
      message: "Quiz question must have exactly 4 options"
    }
  },

  answer: {
    type: String,
    required: true
  },

  explanation: {
    type: String,
    default: ""
  }

})


const Quiz = mongoose.model(
  "Quiz",
  quizSchema
)


module.exports = Quiz