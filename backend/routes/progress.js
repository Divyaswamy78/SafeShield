const express = require("express");
const User = require("../models/UserTemp.js");

const router = express.Router();


// ==================== GET USER PROGRESS ====================

router.get("/:userId", async (req, res) => {

  try {

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      completedLessons: user.completedLessons,
      quizScore: user.quizScore,
      quizAttempts: user.quizAttempts,
      badges: user.badges,
      certificateUnlocked: user.certificateUnlocked,
      certificateDate: user.certificateDate
    });

  } catch (error) {

    console.log("Get Progress Error:", error);

    res.status(500).json({
      message: "Failed to get progress"
    });

  }

});


// ==================== COMPLETE LESSON ====================

router.post("/lesson", async (req, res) => {

  try {

    const { userId, lessonId } = req.body;

    if (!userId || !lessonId) {
      return res.status(400).json({
        message: "User ID and lesson ID are required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    // Save lesson
    if (!user.completedLessons.includes(lessonId)) {

      user.completedLessons.push(lessonId);

    }


    // ==================== BADGES ====================

    // First lesson badge
    if (
      user.completedLessons.length >= 1 &&
      !user.badges.includes("First Step")
    ) {

      user.badges.push("First Step");

    }


    // All 3 lessons badge
    if (
      user.completedLessons.length >= 3 &&
      !user.badges.includes("Safety Learner")
    ) {

      user.badges.push("Safety Learner");

    }


    // ==================== CERTIFICATE ====================

    if (user.completedLessons.length >= 3) {

      user.certificateUnlocked = true;

      if (!user.certificateDate) {

        user.certificateDate = new Date();

      }

    }


    await user.save();


    res.status(200).json({

      message: "Lesson completed successfully",

      completedLessons: user.completedLessons,

      badges: user.badges,

      certificateUnlocked:
        user.certificateUnlocked

    });

  } catch (error) {

    console.log("Complete Lesson Error:", error);

    res.status(500).json({
      message: "Failed to save lesson progress"
    });

  }

});


// ==================== SAVE QUIZ SCORE ====================

router.post("/quiz", async (req, res) => {

  try {

    const { userId, score } = req.body;

    if (!userId || score === undefined) {

      return res.status(400).json({
        message: "User ID and score are required"
      });

    }

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }


    // Save quiz score
    user.quizScore = Number(score);

    user.quizAttempts += 1;


    // Quiz Master badge
    if (
      user.quizScore >= 80 &&
      !user.badges.includes("Quiz Master")
    ) {

      user.badges.push("Quiz Master");

    }


    await user.save();


    res.status(200).json({

      message: "Quiz score saved successfully",

      quizScore: user.quizScore,

      quizAttempts: user.quizAttempts,

      badges: user.badges

    });

  } catch (error) {

    console.log("Save Quiz Error:", error);

    res.status(500).json({
      message: "Failed to save quiz score"
    });

  }

});


// ==================== SAVE BADGES ====================

router.post("/badges", async (req, res) => {

  try {

    const { userId, badges } = req.body;

    if (!userId || !Array.isArray(badges)) {

      return res.status(400).json({
        message: "User ID and badges are required"
      });

    }

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    user.badges = badges;

    await user.save();


    res.status(200).json({

      message: "Badges saved successfully",

      badges: user.badges

    });

  } catch (error) {

    console.log("Save Badges Error:", error);

    res.status(500).json({
      message: "Failed to save badges"
    });

  }

});


module.exports = router;