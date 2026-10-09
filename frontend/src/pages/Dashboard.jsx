import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Dashboard.css"

function Dashboard() {
  const savedUser =
    localStorage.getItem("safeShieldUser")

  const user = savedUser
    ? JSON.parse(savedUser)
    : null

  const [completedLessons, setCompletedLessons] =
    useState(0)

  const [quizScore, setQuizScore] =
    useState(0)

  const [badges, setBadges] =
    useState([])

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        return
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/progress/${user.id}`
        )

        const data = await response.json()

        if (response.ok) {

          // There are currently 3 lessons
          const lessonCount =
            Math.min(
              data.completedLessons.length,
              3
            )

          setCompletedLessons(lessonCount)

          // Quiz has 5 questions
          // Backend stores the number of correct answers
          const percentage = Math.round(
            (data.quizScore / 5) * 100
          )

          setQuizScore(percentage)

          setBadges(
            data.badges.map((badge) => {

              if (badge === "First Step") {
                return {
                  icon: "🛡️",
                  name: "First Step"
                }
              }

              if (badge === "Safety Learner") {
                return {
                  icon: "📚",
                  name: "Safety Learner"
                }
              }

              if (badge === "Quiz Master") {
                return {
                  icon: "🧠",
                  name: "Quiz Master"
                }
              }

              return {
                icon: "🏆",
                name: badge
              }
            })
          )
        }

      } catch (error) {
        console.log(
          "Progress Fetch Error:",
          error
        )
      }
    }

    fetchProgress()

  }, [])

  return (

    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <section className="dashboard-header">

        <div>

          <p className="dashboard-tag">
            🛡️ SAFESHIELD DASHBOARD
          </p>

          <h1>
            Welcome, {user?.name || "Learner"} 
          </h1>

          <p>
            Continue your safety learning journey
            and build your confidence.
          </p>

        </div>

      </section>


      {/* ================= PROGRESS ================= */}

      <section className="dashboard-progress">

        {/* Lessons */}

        <div className="progress-card">

          <div className="progress-icon">
            📚
          </div>

          <div>

            <h3>
              Lessons Completed
            </h3>

            <h2>
              {completedLessons} / 3
            </h2>

          </div>

        </div>


        {/* Quiz */}

        <div className="progress-card">

          <div className="progress-icon">
            🧠
          </div>

          <div>

            <h3>
              Quiz Score
            </h3>

            <h2>
              {quizScore}%
            </h2>

          </div>

        </div>


        {/* Badges */}

        <div className="progress-card">

          <div className="progress-icon">
            🏆
          </div>

          <div>

            <h3>
              Badges Earned
            </h3>

            <h2>
              {badges.length}
            </h2>

          </div>

        </div>

      </section>


      {/* ================= BADGES ================= */}

      {badges.length > 0 && (

        <section className="dashboard-section">

          <h2>
            Your Badges 🏆
          </h2>

          <p className="section-subtitle">
            Keep learning to unlock more achievements.
          </p>

          <div className="dashboard-cards">

            {badges.map((badge, index) => (

              <div
                className="dashboard-card"
                key={index}
              >

                <div className="card-icon">
                  {badge.icon}
                </div>

                <h3>
                  {badge.name}
                </h3>

                <p>
                  You earned this badge by making
                  progress in your SafeShield journey.
                </p>

              </div>

            ))}

          </div>

        </section>

      )}


      {/* ================= MAIN FEATURES ================= */}

      <section className="dashboard-section">

        <h2>
          Continue Learning
        </h2>

        <p className="section-subtitle">
          Choose what you want to learn today.
        </p>

        <div className="dashboard-cards">

          {/* Lessons */}

          <div className="dashboard-card">

            <div className="card-icon">
              🥋
            </div>

            <h3>
              Self Defence Lessons
            </h3>

            <p>
              Learn practical safety awareness and
              defensive techniques through structured
              lessons.
            </p>

            <Link to="/learn">

              <button>
                Start Learning
              </button>

            </Link>

          </div>


          {/* Quiz */}

          <div className="dashboard-card">

            <div className="card-icon">
              🧠
            </div>

            <h3>
              Safety Scenario Quiz
            </h3>

            <p>
              Test your decision-making skills with
              realistic safety situations.
            </p>

            <Link to="/quiz">

              <button>
                Take Quiz
              </button>

            </Link>

          </div>


          {/* Safety Guide */}

          <div className="dashboard-card">

            <div className="card-icon">
              🚨
            </div>

            <h3>
              Quick Safety Guide
            </h3>

            <p>
              Get quick guidance for common situations
              when you need safety information.
            </p>

            <Link to="/safety">

              <button>
                View Guide
              </button>

            </Link>

          </div>


          {/* Certificate */}

          <div className="dashboard-card">

            <div className="card-icon">
              🎓
            </div>

            <h3>
              My Certificate
            </h3>

            <p>
              Complete your learning journey and unlock
              your SafeShield completion certificate.
            </p>

            <Link to="/certificate">

              <button>
                View Certificate
              </button>

            </Link>

          </div>

        </div>

      </section>

    </div>

  )
}

export default Dashboard