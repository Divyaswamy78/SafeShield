import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "./AdminLessons.css"

function AdminLessons() {

  const [lessons, setLessons] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [editingId, setEditingId] = useState(null)

  const [title, setTitle] = useState("")
  const [level, setLevel] = useState("Beginner")
  const [icon, setIcon] = useState("📚")
  const [description, setDescription] = useState("")
  const [points, setPoints] = useState("")


  // ==================== GET LOGGED-IN USER ====================

  const savedUser =
    localStorage.getItem("safeShieldUser")


  let user = null


  try {

    if (savedUser) {
      user = JSON.parse(savedUser)
    }

  } catch (error) {

    console.log(
      "User Data Error:",
      error
    )

    localStorage.removeItem("safeShieldUser")

  }


  // ==================== ADMIN CHECK ====================

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    )

  }


  if (user.role !== "admin") {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )

  }


  // ==================== FETCH LESSONS ====================

  const fetchLessons = async () => {

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

    }

  }


  useEffect(() => {

    fetchLessons()

  }, [])


  // ==================== RESET FORM ====================

  const resetForm = () => {

    setTitle("")
    setLevel("Beginner")
    setIcon("📚")
    setDescription("")
    setPoints("")
    setEditingId(null)
    setShowForm(false)

  }


  // ==================== ADD / UPDATE ====================

  const handleSubmit = async (e) => {

    e.preventDefault()


    const pointsArray = points
      .split("\n")
      .map((point) => point.trim())
      .filter((point) => point !== "")


    const lessonData = {

      title,
      level,
      icon,
      description,
      points: pointsArray

    }


    try {

      // ==================== UPDATE ====================

      if (editingId) {

        const response = await fetch(
          `http://localhost:5000/api/lessons/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
              "user-id": user.id
            },

            body: JSON.stringify(
              lessonData
            )

          }
        )


        const data = await response.json()


        if (response.ok) {

          alert(
            "Lesson updated successfully! ✏️"
          )

          resetForm()

          fetchLessons()

        } else {

          alert(
            data.message ||
            "Failed to update lesson"
          )

        }

        return

      }


      // ==================== ADD ====================

      const response = await fetch(
        "http://localhost:5000/api/lessons",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "user-id": user.id
          },

          body: JSON.stringify(
            lessonData
          )

        }
      )


      const data = await response.json()


      if (response.ok) {

        alert(
          "Lesson added successfully! 🎉"
        )

        resetForm()

        fetchLessons()

      } else {

        alert(
          data.message ||
          "Failed to add lesson"
        )

      }

    } catch (error) {

      console.log(
        "Save Lesson Error:",
        error
      )

      alert(
        "Server error. Please try again."
      )

    }

  }


  // ==================== EDIT ====================

  const handleEdit = (lesson) => {

    setEditingId(lesson._id)

    setTitle(lesson.title)

    setLevel(lesson.level)

    setIcon(
      lesson.icon || "📚"
    )

    setDescription(
      lesson.description
    )

    setPoints(
      lesson.points
        ? lesson.points.join("\n")
        : ""
    )

    setShowForm(true)


    window.scrollTo({
      top: 350,
      behavior: "smooth"
    })

  }


  // ==================== DELETE ====================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this lesson?"
      )


    if (!confirmDelete) {
      return
    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/lessons/${id}`,
        {
          method: "DELETE",

          headers: {
            "user-id": user.id
          }

        }
      )


      const data = await response.json()


      if (response.ok) {

        alert(
          "Lesson deleted successfully! 🗑️"
        )

        fetchLessons()

      } else {

        alert(
          data.message ||
          "Failed to delete lesson"
        )

      }

    } catch (error) {

      console.log(
        "Delete Lesson Error:",
        error
      )

      alert(
        "Server error. Please try again."
      )

    }

  }


  // ==================== PAGE ====================

  return (

    <div className="admin-lessons-page">


      {/* ================= HEADER ================= */}

      <section className="admin-lessons-header">

        <p>
          🛡️ SAFESHIELD ADMIN
        </p>

        <h1>
          Lesson Management 📚
        </h1>

        <span>
          Add, edit and manage SafeShield learning lessons.
        </span>

      </section>



      {/* ================= CONTENT ================= */}

      <section className="admin-lessons-content">


        <div className="lessons-top">

          <h2>
            Lessons
          </h2>


          <div className="lessons-top-actions">

            <button
              className="add-lesson-btn"
              onClick={() => {

                if (showForm) {

                  resetForm()

                } else {

                  setShowForm(true)

                }

              }}
            >

              {showForm
                ? "✕ Close Form"
                : "+ Add Lesson"}

            </button>


            <Link to="/admin">
              ← Back to Admin
            </Link>

          </div>

        </div>



        {/* ================= FORM ================= */}

        {showForm && (

          <form
            className="lesson-form"
            onSubmit={handleSubmit}
          >

            <h3>

              {editingId
                ? "Edit Lesson ✏️"
                : "Add New Lesson 📚"}

            </h3>


            <label>
              Lesson Title
            </label>

            <input
              type="text"
              placeholder="Enter lesson title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />


            <label>
              Level
            </label>

            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
            >

              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>

            </select>


            <label>
              Icon
            </label>

            <input
              type="text"
              placeholder="Example: 🛡️"
              value={icon}
              onChange={(e) =>
                setIcon(e.target.value)
              }
            />


            <label>
              Description
            </label>

            <textarea
              placeholder="Enter lesson description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
            />


            <label>
              Learning Points
            </label>

            <textarea
              placeholder={
                "Enter one point per line\nExample:\nStay aware of your surroundings.\nChoose well-lit areas."
              }
              value={points}
              onChange={(e) =>
                setPoints(e.target.value)
              }
            />


            <button
              type="submit"
              className="save-lesson-btn"
            >

              {editingId
                ? "Update Lesson ✏️"
                : "Save Lesson 🎉"}

            </button>


            {editingId && (

              <button
                type="button"
                className="cancel-edit-btn"
                onClick={resetForm}
              >
                Cancel Edit
              </button>

            )}

          </form>

        )}



        {/* ================= LESSON LIST ================= */}

        <div className="admin-lesson-list">

          {lessons.length === 0 ? (

            <div className="no-lessons">

              No lessons found.
              Add your first lesson!

            </div>

          ) : (

            lessons.map((lesson) => (

              <div
                className="admin-lesson-card"
                key={lesson._id}
              >

                <div className="admin-lesson-icon">
                  {lesson.icon}
                </div>


                <div className="admin-lesson-info">

                  <span className="lesson-level">
                    {lesson.level}
                  </span>

                  <h3>
                    {lesson.title}
                  </h3>

                  <p>
                    {lesson.description}
                  </p>

                  <span>
                    {lesson.points?.length || 0}
                    {" "}
                    learning points
                  </span>

                </div>


                <div className="admin-lesson-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(lesson)
                    }
                  >
                    ✏️ Edit
                  </button>


                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(lesson._id)
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </div>

  )

}

export default AdminLessons