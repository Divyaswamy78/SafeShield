const express = require("express")
const User = require("../models/UserTemp.js")
const Lesson = require("../models/Lesson.js")
const Quiz = require("../models/Quiz.js")
const adminAuth = require("../middleware/adminAuth.js")

const router = express.Router()


// ===============================
// GET ALL USERS
// ===============================

router.get(
  "/users",
  adminAuth,
  async (req, res) => {
    try {
      const users = await User
        .find()
        .select("-password")

      res.status(200).json(users)

    } catch (error) {
      console.log("Get Users Error:", error)

      res.status(500).json({
        message: "Failed to get users"
      })
    }
  }
)


// ===============================
// ADMIN STATISTICS
// ===============================

router.get(
  "/stats",
  adminAuth,
  async (req, res) => {
    try {

      const totalUsers =
        await User.countDocuments()

      const totalLessons =
        await Lesson.countDocuments()

      const totalQuizQuestions =
        await Quiz.countDocuments()

      const totalCertificates =
        await User.countDocuments({
          certificateUnlocked: true
        })

      res.status(200).json({

        totalUsers,

        totalLessons,

        totalQuizQuestions,

        totalCertificates

      })

    } catch (error) {

      console.log(
        "Admin Stats Error:",
        error
      )

      res.status(500).json({
        message:
          "Failed to get admin statistics"
      })
    }
  }
)


module.exports = router