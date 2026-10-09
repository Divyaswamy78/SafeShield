import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "./AdminProgress.css"

function AdminProgress() {
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

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const isAdmin = user?.role === "admin"

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.id || !isAdmin) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              "user-id": user.id
            }
          }
        )

        const data = await response.json()

        if (response.ok) {
          setUsers(data)
        } else {
          setError(
            data.message ||
              "Failed to load progress."
          )
        }
      } catch (error) {
        console.log(
          "Progress Fetch Error:",
          error
        )

        setError(
          "Unable to connect to the server."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
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
    <div className="admin-progress-page">

      {/* Header */}

      <section className="admin-progress-header">

        <div>
          <p className="admin-progress-tag">
            📊 SAFESHIELD ADMIN
          </p>

          <h1>
            Progress Overview
          </h1>

          <p>
            Track learner progress,
            quiz performance and certificates.
          </p>
        </div>

        <Link
          to="/admin"
          className="progress-back-btn"
        >
          ← Admin Dashboard
        </Link>

      </section>


      {/* Content */}

      <section className="admin-progress-content">

        <div className="progress-title">

          <div>
            <h2>
              👥 Learner Progress
            </h2>

            <p>
              Overview of all registered
              SafeShield users.
            </p>
          </div>

          <div className="progress-user-count">
            {users.length} Users
          </div>

        </div>


        {/* Loading */}

        {loading && (
          <div className="progress-message">

            <div className="progress-message-icon">
              📊
            </div>

            <h3>
              Loading progress...
            </h3>

          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="progress-message">

            <div className="progress-message-icon">
              ⚠️
            </div>

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* No users */}

        {!loading &&
          !error &&
          users.length === 0 && (
            <div className="progress-message">

              <div className="progress-message-icon">
                👥
              </div>

              <h3>
                No Users Found
              </h3>

              <p>
                No learners have registered yet.
              </p>

            </div>
          )}


        {/* User Progress Cards */}

        {!loading &&
          !error &&
          users.length > 0 && (

            <div className="progress-user-grid">

              {users.map((student) => {

                // There are currently 3 lessons
                const lessonCount = Math.min(
                  student.completedLessons?.length || 0,
                  3
                )

                // Quiz contains 5 questions
                // Database stores number of correct answers
                const quizPercentage = Math.round(
                  ((student.quizScore || 0) / 5) * 100
                )

                return (
                  <div
                    className="progress-user-card"
                    key={student._id}
                  >

                    <div className="progress-user-top">

                      <div className="progress-avatar">
                        {student.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <h3>
                          {student.name}
                        </h3>

                        <p>
                          {student.email}
                        </p>
                      </div>

                    </div>


                    {/* Stats */}

                    <div className="progress-stats">

                      <div className="progress-stat">

                        <span className="progress-stat-icon">
                          📚
                        </span>

                        <div>
                          <small>
                            Lessons
                          </small>

                          <strong>
                            {lessonCount}
                          </strong>
                        </div>

                      </div>


                      <div className="progress-stat">

                        <span className="progress-stat-icon">
                          🧠
                        </span>

                        <div>
                          <small>
                            Quiz Score
                          </small>

                          <strong>
                            {quizPercentage}%
                          </strong>
                        </div>

                      </div>


                      <div className="progress-stat">

                        <span className="progress-stat-icon">
                          🔄
                        </span>

                        <div>
                          <small>
                            Attempts
                          </small>

                          <strong>
                            {student.quizAttempts || 0}
                          </strong>
                        </div>

                      </div>

                    </div>


                    {/* Badges */}

                    <div className="progress-badges">

                      <h4>
                        🏆 Badges
                      </h4>

                      {student.badges &&
                      student.badges.length > 0 ? (

                        <div className="badge-list">

                          {student.badges.map(
                            (badge, index) => (

                              <span
                                className="progress-badge"
                                key={index}
                              >
                                🏆 {badge}
                              </span>

                            )
                          )}

                        </div>

                      ) : (

                        <span className="no-badge">
                          No badges earned yet
                        </span>

                      )}

                    </div>


                    {/* Certificate */}

                    <div
                      className={
                        student.certificateUnlocked
                          ? "certificate-status unlocked"
                          : "certificate-status locked"
                      }
                    >

                      <span>
                        {student.certificateUnlocked
                          ? "🎓"
                          : "🔒"}
                      </span>

                      <div>

                        <strong>
                          Certificate
                        </strong>

                        <p>
                          {student.certificateUnlocked
                            ? "Unlocked"
                            : "Not unlocked"}
                        </p>

                      </div>

                    </div>

                  </div>
                )
              })}

            </div>
          )}

      </section>

    </div>
  )
}

export default AdminProgress