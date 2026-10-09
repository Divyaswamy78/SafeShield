import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "./Admin.css"

function Admin() {
  const savedUser =
    localStorage.getItem("safeShieldUser")

  let user = null

  try {
    if (savedUser) {
      user = JSON.parse(savedUser)
    }
  } catch (error) {
    localStorage.removeItem("safeShieldUser")
  }

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    totalQuizQuestions: 0,
    totalCertificates: 0
  })

  const [loading, setLoading] = useState(true)

  const isAdmin = user?.role === "admin"

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id || !isAdmin) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              "user-id": user.id
            }
          }
        )

        const data = await response.json()

        if (response.ok) {
          setStats(data)
        }
      } catch (error) {
        console.log(
          "Admin Stats Error:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user?.id, isAdmin])

  if (!savedUser || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  return (
    <div className="admin-page">

      {/* HEADER */}

      <section className="admin-header">

        <div>

          <p className="admin-tag">
            🛡️ SAFESHIELD ADMIN
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage users, lessons and safety
            quiz content from one place.
          </p>

        </div>

        <div className="admin-welcome">

          <span>👋</span>

          <div>

            <small>
              Welcome Admin
            </small>

            <strong>
              {user.name}
            </strong>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="admin-content">

        {/* OVERVIEW */}

        <div className="admin-section-title">

          <h2>
            📊 Overview
          </h2>

          <p>
            Quick overview of your
            SafeShield platform.
          </p>

        </div>


        {/* STATS */}

        <div className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>

              <span>
                Total Users
              </span>

              <strong>
                {loading
                  ? "..."
                  : stats.totalUsers}
              </strong>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              📚
            </div>

            <div>

              <span>
                Total Lessons
              </span>

              <strong>
                {loading
                  ? "..."
                  : stats.totalLessons}
              </strong>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              🧠
            </div>

            <div>

              <span>
                Quiz Questions
              </span>

              <strong>
                {loading
                  ? "..."
                  : stats.totalQuizQuestions}
              </strong>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon">
              🎓
            </div>

            <div>

              <span>
                Certificates
              </span>

              <strong>
                {loading
                  ? "..."
                  : stats.totalCertificates}
              </strong>

            </div>

          </div>

        </div>


        {/* MANAGEMENT */}

        <div className="admin-section-title management-title">

          <h2>
            ⚙️ Management
          </h2>

          <p>
            Manage different parts of
            the SafeShield website.
          </p>

        </div>


        <div className="admin-management-grid">

          {/* USER MANAGEMENT */}

          <div className="admin-management-card">

            <div className="management-icon">
              👥
            </div>

            <h3>
              User Management
            </h3>

            <p>
              View registered users, their
              roles and certificate progress.
            </p>

            <Link
              to="/admin/users"
              className="management-btn"
            >
              Manage Users →
            </Link>

          </div>


          {/* LESSON MANAGEMENT */}

          <div className="admin-management-card">

            <div className="management-icon">
              📚
            </div>

            <h3>
              Lesson Management
            </h3>

            <p>
              Add, edit or remove self-defence
              and safety learning lessons.
            </p>

            <Link
              to="/admin/lessons"
              className="management-btn"
            >
              Manage Lessons →
            </Link>

          </div>


          {/* QUIZ MANAGEMENT */}

          <div className="admin-management-card">

            <div className="management-icon">
              🧠
            </div>

            <h3>
              Quiz Management
            </h3>

            <p>
              Create and manage scenario-based
              safety quiz questions.
            </p>

            <Link
              to="/admin/quiz"
              className="management-btn"
            >
              Manage Quiz →
            </Link>

          </div>


          {/* PROGRESS */}

          <div className="admin-management-card">

            <div className="management-icon">
              📈
            </div>

            <h3>
              Progress Overview
            </h3>

            <p>
              View learner progress, completed
              lessons and quiz performance.
            </p>

            <Link
              to="/admin/progress"
              className="management-btn"
            >
              View Progress →
            </Link>

          </div>

        </div>


        {/* BACK */}

        <div className="admin-bottom">

          <Link
            to="/dashboard"
            className="back-dashboard-btn"
          >
            ← Back to Dashboard
          </Link>

        </div>

      </section>

    </div>
  )
}

export default Admin