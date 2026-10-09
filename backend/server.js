const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const progressRoutes = require("./routes/progress")
const adminRoutes = require("./routes/admin")
const lessonRoutes = require("./routes/lessons")
const quizRoutes = require("./routes/quiz")


const app = express()

const PORT = 5000


// ==================== MIDDLEWARE ====================

app.use(cors())

app.use(express.json())


// ==================== ROUTES ====================

app.use(
  "/api/auth",
  authRoutes
)

app.use(
  "/api/progress",
  progressRoutes
)

app.use(
  "/api/admin",
  adminRoutes
)

app.use(
  "/api/lessons",
  lessonRoutes
)

app.use(
  "/api/quiz",
  quizRoutes
)


// ==================== MONGODB ====================

mongoose
  .connect(
    "mongodb://localhost:27017/SafeShield"
  )

  .then(() => {

    console.log(
      "MongoDB Connected Successfully!"
    )

  })

  .catch((error) => {

    console.log(
      "MongoDB Connection Error:",
      error
    )

  })


// ==================== ROOT ROUTE ====================

app.get("/", (req, res) => {

  res.send(
    "SafeShield Backend is running!"
  )

})


// ==================== START SERVER ====================

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    )

  }
)