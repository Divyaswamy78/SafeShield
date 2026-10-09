import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Certificate.css"

function Certificate() {

  const savedUser =
    localStorage.getItem("safeShieldUser")

  const user = savedUser
    ? JSON.parse(savedUser)
    : null

  const [progress, setProgress] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchProgress = async () => {

      if (!user) {
        setLoading(false)
        return
      }

      try {

        const response = await fetch(
          `http://localhost:5000/api/progress/${user.id}`
        )

        const data = await response.json()

        if (response.ok) {
          setProgress(data)
        }

      } catch (error) {

        console.log(
          "Certificate Progress Error:",
          error
        )

      } finally {

        setLoading(false)

      }

    }

    fetchProgress()

  }, [user?.id])


  if (loading) {

    return (
      <div className="certificate-page">

        <div className="certificate-container">

          <h1>
            Loading Certificate...
          </h1>

        </div>

      </div>
    )

  }


  if (!user) {

    return (
      <div className="certificate-page">

        <div className="certificate-container">

          <div className="certificate-logo">
            🔐
          </div>

          <h1>
            Login Required
          </h1>

          <p className="certificate-text">
            Please login to view your certificate.
          </p>

          <Link to="/login">

            <button className="certificate-button">
              Login
            </button>

          </Link>

        </div>

      </div>
    )

  }


  // ==================== PROGRESS ====================

  // There are currently 3 lessons
  const completedLessons = Math.min(
    progress?.completedLessons?.length || 0,
    3
  )

  // Quiz contains 5 questions
  // Backend stores number of correct answers
  const quizScore = Math.round(
    ((progress?.quizScore || 0) / 5) * 100
  )

  const isCompleted =
    progress?.certificateUnlocked === true


  // ==================== LOCKED ====================

  if (!isCompleted) {

    return (
      <div className="certificate-page">

        <div className="certificate-container">

          <div className="certificate-logo">
            🔒
          </div>

          <p className="certificate-brand">
            SAFESHIELD
          </p>

          <h1>
            Certificate Locked
          </h1>

          <p className="certificate-text">
            Complete all three SafeShield lessons
            to unlock your certificate.
          </p>

          <div className="certificate-details">

            <div>

              <span>
                Lessons Completed
              </span>

              <strong>
                {completedLessons} / 3
              </strong>

            </div>

            <div>

              <span>
                Quiz Score
              </span>

              <strong>
                {quizScore}%
              </strong>

            </div>

          </div>

          <Link to="/learn">

            <button className="certificate-button">
              Continue Learning
            </button>

          </Link>

        </div>

      </div>
    )

  }


  // ==================== UNLOCKED ====================

  return (
    <div className="certificate-page">

      <div className="certificate-container">

        <div className="certificate-logo">
          🛡️
        </div>

        <p className="certificate-brand">
          SAFESHIELD
        </p>

        <h1>
          Certificate of Completion
        </h1>

        <p className="certificate-text">
          This certificate is proudly presented to
        </p>

        <h2 className="certificate-name">
          {user.name || "SafeShield Learner"}
        </h2>

        <p className="certificate-text">
          for successfully completing the
        </p>

        <h3>
          SafeShield Safety Learning Program
        </h3>

        <div className="certificate-details">

          <div>

            <span>
              Lessons Completed
            </span>

            <strong>
              {completedLessons} / 3
            </strong>

          </div>

          <div>

            <span>
              Quiz Score
            </span>

            <strong>
              {quizScore}%
            </strong>

          </div>

        </div>

        <div className="certificate-footer">

          <div>

            <strong>
              🛡️ SafeShield
            </strong>

            <span>
              Safety Learning Platform
            </span>

          </div>

          <div>

            <strong>
              {progress?.certificateDate
                ? new Date(
                    progress.certificateDate
                  ).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </strong>

            <span>
              Date of Completion
            </span>

          </div>

        </div>

        <Link to="/dashboard">

          <button className="certificate-button">
            ← Back to Dashboard
          </button>

        </Link>

      </div>

    </div>
  )
}

export default Certificate