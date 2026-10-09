const express = require("express")
const Lesson = require("../models/Lesson.js")
const adminAuth = require("../middleware/adminAuth.js")

const router = express.Router()


// ==================== GET ALL LESSONS ====================
// Public - Users can view lessons

router.get("/", async (req, res) => {

  try {

    const lessons = await Lesson.find()

    res.status(200).json(lessons)

  } catch (error) {

    console.log(
      "Get Lessons Error:",
      error
    )

    res.status(500).json({
      message: "Failed to get lessons"
    })

  }

})


// ==================== ADD LESSON ====================
// Admin only

router.post(
  "/",
  adminAuth,
  async (req, res) => {

    try {

      const {
        title,
        level,
        icon,
        description,
        points
      } = req.body


      if (
        !title ||
        !level ||
        !description
      ) {

        return res.status(400).json({
          message: "Please fill all required fields"
        })

      }


      const lesson = new Lesson({

        title,

        level,

        icon,

        description,

        points

      })


      await lesson.save()


      res.status(201).json({

        message: "Lesson added successfully",

        lesson

      })

    } catch (error) {

      console.log(
        "Add Lesson Error:",
        error
      )

      res.status(500).json({
        message: "Failed to add lesson"
      })

    }

  }
)


// ==================== UPDATE LESSON ====================
// Admin only

router.put(
  "/:id",
  adminAuth,
  async (req, res) => {

    try {

      const lesson =
        await Lesson.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
            runValidators: true
          }

        )


      if (!lesson) {

        return res.status(404).json({
          message: "Lesson not found"
        })

      }


      res.status(200).json({

        message: "Lesson updated successfully",

        lesson

      })

    } catch (error) {

      console.log(
        "Update Lesson Error:",
        error
      )

      res.status(500).json({
        message: "Failed to update lesson"
      })

    }

  }
)


// ==================== DELETE LESSON ====================
// Admin only

router.delete(
  "/:id",
  adminAuth,
  async (req, res) => {

    try {

      const lesson =
        await Lesson.findByIdAndDelete(
          req.params.id
        )


      if (!lesson) {

        return res.status(404).json({
          message: "Lesson not found"
        })

      }


      res.status(200).json({

        message:
          "Lesson deleted successfully"

      })

    } catch (error) {

      console.log(
        "Delete Lesson Error:",
        error
      )

      res.status(500).json({
        message: "Failed to delete lesson"
      })

    }

  }
)


module.exports = router