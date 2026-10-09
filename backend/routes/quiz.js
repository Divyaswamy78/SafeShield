const express = require("express")
const Quiz = require("../models/Quiz.js")
const adminAuth = require("../middleware/adminAuth.js")

const router = express.Router()


// ==================== GET ALL QUESTIONS ====================
// Public - Quiz page can read questions

router.get("/", async (req, res) => {

  try {

    const questions = await Quiz.find()

    res.status(200).json(questions)

  } catch (error) {

    console.log(
      "Get Quiz Error:",
      error
    )

    res.status(500).json({
      message: "Failed to get quiz questions"
    })

  }

})


// ==================== ADD QUESTION ====================
// Admin only

router.post(
  "/",
  adminAuth,
  async (req, res) => {

    try {

      const {
        question,
        options,
        answer,
        explanation
      } = req.body


      if (
        !question ||
        !Array.isArray(options) ||
        options.length !== 4 ||
        !answer
      ) {

        return res.status(400).json({
          message:
            "Question, 4 options and correct answer are required"
        })

      }


      if (!options.includes(answer)) {

        return res.status(400).json({
          message:
            "Correct answer must match one of the options"
        })

      }


      const newQuiz = new Quiz({

        question,

        options,

        answer,

        explanation

      })


      await newQuiz.save()


      res.status(201).json({

        message:
          "Quiz question added successfully",

        quiz: newQuiz

      })

    } catch (error) {

      console.log(
        "Add Quiz Error:",
        error
      )

      res.status(500).json({
        message: "Failed to add quiz question"
      })

    }

  }
)


// ==================== UPDATE QUESTION ====================
// Admin only

router.put(
  "/:id",
  adminAuth,
  async (req, res) => {

    try {

      const {
        question,
        options,
        answer,
        explanation
      } = req.body


      if (
        !question ||
        !Array.isArray(options) ||
        options.length !== 4 ||
        !answer
      ) {

        return res.status(400).json({
          message:
            "Question, 4 options and correct answer are required"
        })

      }


      if (!options.includes(answer)) {

        return res.status(400).json({
          message:
            "Correct answer must match one of the options"
        })

      }


      const quiz =
        await Quiz.findByIdAndUpdate(

          req.params.id,

          {
            question,
            options,
            answer,
            explanation
          },

          {
            new: true,
            runValidators: true
          }

        )


      if (!quiz) {

        return res.status(404).json({
          message: "Quiz question not found"
        })

      }


      res.status(200).json({

        message:
          "Quiz question updated successfully",

        quiz

      })

    } catch (error) {

      console.log(
        "Update Quiz Error:",
        error
      )

      res.status(500).json({
        message: "Failed to update quiz question"
      })

    }

  }
)


// ==================== DELETE QUESTION ====================
// Admin only

router.delete(
  "/:id",
  adminAuth,
  async (req, res) => {

    try {

      const quiz =
        await Quiz.findByIdAndDelete(
          req.params.id
        )


      if (!quiz) {

        return res.status(404).json({
          message: "Quiz question not found"
        })

      }


      res.status(200).json({

        message:
          "Quiz question deleted successfully"

      })

    } catch (error) {

      console.log(
        "Delete Quiz Error:",
        error
      )

      res.status(500).json({
        message: "Failed to delete quiz question"
      })

    }

  }
)


module.exports = router