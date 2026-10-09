import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./LessonDetails.css"

function LessonDetails() {

  const { lessonId } = useParams()
  const navigate = useNavigate()

  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/lessons"
        )

        const data = await response.json()

        if (response.ok) {
          const selectedLesson = data.find(
            (item) => item._id === lessonId
          )

          if (selectedLesson) {
            setLesson(selectedLesson)
          } else {
            setLesson(null)
          }
        }
      } catch (error) {
        console.log(
          "Lesson Details Error:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchLesson()
  }, [lessonId])

  const handleComplete = async () => {

    const savedUser =
      localStorage.getItem("safeShieldUser")

    if (!savedUser) {
      alert(
        "Please login to save your progress."
      )

      navigate("/login")
      return
    }

    const user = JSON.parse(savedUser)

    try {

      const response = await fetch(
        "http://localhost:5000/api/progress/lesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            lessonId: lesson._id
          })
        }
      )

      const data = await response.json()

      if (response.ok) {

        setCompleted(true)

        alert(
          "Lesson completed successfully! 🎉"
        )

      } else {

        alert(
          data.message ||
          "Failed to save progress."
        )
      }

    } catch (error) {

      console.log(
        "Complete Lesson Error:",
        error
      )

      alert(
        "Server error. Please try again."
      )
    }
  }

  /* ========================= */
  /* VIDEO BASED ON LEVEL */
  /* ========================= */

  const getVideoDetails = () => {

    if (!lesson) {
      return null
    }

    const level =
      lesson.level?.toLowerCase()

    if (level === "beginner") {

      return {
  title: "Wrist Grab Defense - Self Defence Training",
  videoId: "VI0zJhcppzc"
}
    }

    if (level === "intermediate") {

      if (level === "intermediate") {
  return {
    title: "Grab & Hold Escape Training",
    videoId: "TDaZwZ227v0"
  }
}
    }

   if (level === "advanced") {
  return {
    title: "Women's Self-Defence - Neck Grab Escape",
    videoId: "TqYKjv7BWWs"
  }
}

    return null
  }

  const video = getVideoDetails()

  if (loading) {

    return (
      <div className="lesson-details-page">

        <div className="lesson-loading">
          Loading lesson... 📚
        </div>

      </div>
    )
  }

  if (!lesson) {

    return (
      <div className="lesson-details-page">

        <div className="lesson-not-found">

          <h2>
            Lesson Not Found 😕
          </h2>

          <p>
            This lesson may have been removed by the admin.
          </p>

          <Link to="/learn">
            ← Back to Learn
          </Link>

        </div>

      </div>
    )
  }

  return (
    <div className="lesson-details-page">

      {/* ========================= */}
      {/* LESSON HEADER */}
      {/* ========================= */}

      <section className="lesson-details-header">

        <div className="lesson-details-icon">
          {lesson.icon || "📚"}
        </div>

        <span className="lesson-details-level">
          {lesson.level}
        </span>

        <h1>
          {lesson.title}
        </h1>

        <p>
          {lesson.description}
        </p>

      </section>


      <section className="lesson-details-content">

        {/* ========================= */}
        {/* VIDEO */}
        {/* ========================= */}

        {video && (

          <div className="lesson-video-card">

            <div className="lesson-video-heading">

              <span className="lesson-video-icon">
                🎥
              </span>

              <div>

                <h2>
                  Self-Defence Demonstration
                </h2>

                <p>
                  {video.title}
                </p>

              </div>

            </div>

            <div className="lesson-video-container">

              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

            </div>

            <p className="lesson-video-note">
              🛡️ Watch the demonstration carefully.
              Physical techniques should be practiced only
              in a safe environment with proper supervision.
            </p>

          </div>

        )}


        {/* ========================= */}
        {/* LEARNING POINTS */}
        {/* ========================= */}

        <div className="lesson-points-card">

          <h2>
            🧠 What You Will Learn
          </h2>

          {lesson.points &&
          lesson.points.length > 0 ? (

            <ul>

              {lesson.points.map(
                (point, index) => (

                  <li key={index}>

                    <span className="point-icon">
                      ✓
                    </span>

                    {point}

                  </li>

                )
              )}

            </ul>

          ) : (

            <p className="no-points">
              No learning points added yet.
            </p>

          )}

        </div>


        {/* ========================= */}
        {/* COMPLETE LESSON */}
        {/* ========================= */}

        <div className="lesson-completion-card">

          {completed ? (

            <>

              <div className="completion-icon">
                🎉
              </div>

              <h2>
                Lesson Completed!
              </h2>

              <p>
                Great job! Your progress has been saved.
              </p>

              <div className="completion-buttons">

                <Link
                  to="/learn"
                  className="lesson-btn primary"
                >
                  ← Back to Learn
                </Link>

                <Link
                  to="/dashboard"
                  className="lesson-btn secondary"
                >
                  View Dashboard
                </Link>

              </div>

            </>

          ) : (

            <>

              <div className="completion-icon">
                🛡️
              </div>

              <h2>
                Ready to Complete?
              </h2>

              <p>
                Watch the demonstration and review
                the learning points before completing
                this lesson.
              </p>

              <button
                className="complete-lesson-btn"
                onClick={handleComplete}
              >
                ✓ Mark Lesson as Completed
              </button>

              <br />

              <Link
                to="/learn"
                className="back-learn-link"
              >
                ← Back to Learn
              </Link>

            </>

          )}

        </div>

      </section>

    </div>
  )
}

export default LessonDetails