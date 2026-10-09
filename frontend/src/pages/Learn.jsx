import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Learn.css"

function Learn() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(false)

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

  const isLoggedIn = !!user

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }

    const fetchLessons = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          "http://localhost:5000/api/lessons"
        )

        const data = await response.json()

        if (response.ok) {
          setLessons(data)
        }
      } catch (error) {
        console.log(
          "Lessons Fetch Error:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [isLoggedIn])

  /* ========================= */
  /* PUBLIC LEARN PAGE */
  /* ========================= */

  if (!isLoggedIn) {
    return (
      <div className="learn-page">

        <section className="learn-header">

          <p className="learn-tag">
            🛡️ SAFESHIELD LEARNING
          </p>

          <h1>
            Learn Self-Defence & Safety
          </h1>

          <p>
            Build confidence and stay prepared
            with practical safety education.
          </p>

        </section>

        <section className="learn-content">

          <div className="learn-cards">

            {/* BEGINNER */}

            <div className="learn-card">

              <div className="learn-card-icon">
                🥋
              </div>

              <div className="learn-level beginner">
                BEGINNER
              </div>

              <h2>
                Learn Self Defence
              </h2>

              <p>
                Learn practical self-defence
                techniques through easy-to-follow
                lessons and demonstrations.
              </p>

            </div>


            {/* INTERMEDIATE */}

            <div className="learn-card">

              <div className="learn-card-icon">
                🛡️
              </div>

              <div className="learn-level intermediate">
                INTERMEDIATE
              </div>

              <h2>
                Safety Awareness
              </h2>

              <p>
                Improve your awareness and learn
                how to respond safely in different
                situations.
              </p>

            </div>


            {/* ADVANCED */}

            <div className="learn-card">

              <div className="learn-card-icon">
                🚨
              </div>

              <div className="learn-level advanced">
                ADVANCED
              </div>

              <h2>
                Emergency Guidance
              </h2>

              <p>
                Access important emergency
                information and safety guidance
                whenever you need it.
              </p>

            </div>

          </div>

        </section>

      </div>
    )
  }


  /* ========================= */
  /* LOGGED-IN COURSE LEVELS */
  /* ========================= */

  const levels = [
    {
      name: "Beginner",
      icon: "🌱",
      className: "beginner"
    },
    {
      name: "Intermediate",
      icon: "🛡️",
      className: "intermediate"
    },
    {
      name: "Advanced",
      icon: "⭐",
      className: "advanced"
    }
  ]


  return (
    <div className="learn-page">

      {/* ========================= */}
      {/* PAGE HEADER */}
      {/* ========================= */}

      <section className="learn-header">

        <p className="learn-tag">
          🛡️ SAFESHIELD COURSE
        </p>

        <h1>
          Start Learning
        </h1>

        <p>
          Complete lessons, earn points and
          build your safety knowledge.
        </p>

      </section>


      {/* ========================= */}
      {/* COURSE CONTENT */}
      {/* ========================= */}

      <section className="learn-content">

        {loading ? (

          <div className="course-message">
            📚 Loading your courses...
          </div>

        ) : (

          <div className="course-levels">

            {levels.map((level) => {

              const levelLessons =
                lessons.filter(
                  (lesson) =>
                    lesson.level?.toLowerCase() ===
                    level.name.toLowerCase()
                )

              return (

                <div
                  className={`course-level ${level.className}`}
                  key={level.name}
                >

                  {/* LEVEL HEADER */}

                  <div className="course-level-header">

                    <span className="course-level-icon">
                      {level.icon}
                    </span>

                    <div>

                      <span className="course-level-label">
                        {level.name.toUpperCase()}
                      </span>

                      <h2>
                        {level.name} Learning
                      </h2>

                    </div>

                  </div>


                  {/* LESSONS */}

                  {levelLessons.length === 0 ? (

                    <div className="course-empty">
                      No lessons available yet.
                    </div>

                  ) : (

                    <div className="course-lessons">

                      {levelLessons.map(
                        (lesson) => (

                          <div
                            className="course-lesson-card"
                            key={lesson._id}
                          >

                            {/* LESSON ICON */}

                            <div className="course-lesson-icon">
                              {lesson.icon || "📚"}
                            </div>


                            {/* LESSON CONTENT */}

                            <div className="course-lesson-content">

                              <h3>
                                {lesson.title}
                              </h3>

                              <p>
                                {lesson.description}
                              </p>

                              <div className="course-points">

                                🎯{" "}
                                {lesson.points?.length || 0}
                                {" "}learning points

                              </div>

                            </div>


                            {/* START LEARNING */}

                            <Link
                              to={`/lesson/${lesson._id}`}
                              className="start-course-btn"
                            >
                              Start Learning →
                            </Link>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              )
            })}

          </div>

        )}

      </section>

    </div>
  )
}

export default Learn