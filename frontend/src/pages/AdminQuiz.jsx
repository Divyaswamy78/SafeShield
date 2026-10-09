import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "./AdminQuiz.css"

function AdminQuiz() {

  const [questions, setQuestions] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [editingId, setEditingId] = useState(null)

  const [question, setQuestion] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setOption2] = useState("")
  const [option3, setOption3] = useState("")
  const [option4, setOption4] = useState("")
  const [answer, setAnswer] = useState("")
  const [explanation, setExplanation] = useState("")


  // ==================== GET USER ====================

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


  // ==================== FETCH QUESTIONS ====================

  const fetchQuestions = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/quiz"
      )

      const data = await response.json()

      if (response.ok) {

        setQuestions(data)

      }

    } catch (error) {

      console.log(
        "Quiz Fetch Error:",
        error
      )

    }

  }


  useEffect(() => {

    fetchQuestions()

  }, [])


  // ==================== RESET FORM ====================

  const resetForm = () => {

    setQuestion("")
    setOption1("")
    setOption2("")
    setOption3("")
    setOption4("")
    setAnswer("")
    setExplanation("")

    setEditingId(null)
    setShowForm(false)

  }


  // ==================== ADD / UPDATE ====================

  const handleSubmit = async (e) => {

    e.preventDefault()


    const options = [
      option1,
      option2,
      option3,
      option4
    ]


    if (!answer) {

      alert(
        "Please select the correct answer."
      )

      return

    }


    const quizData = {

      question,

      options,

      answer,

      explanation

    }


    try {

      // ==================== UPDATE ====================

      if (editingId) {

        const response = await fetch(
          `http://localhost:5000/api/quiz/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
              "user-id": user.id
            },

            body: JSON.stringify(
              quizData
            )

          }
        )


        const data = await response.json()


        if (response.ok) {

          alert(
            "Quiz question updated! ✏️"
          )

          resetForm()

          fetchQuestions()

        } else {

          alert(
            data.message ||
            "Failed to update question"
          )

        }

        return

      }


      // ==================== ADD ====================

      const response = await fetch(
        "http://localhost:5000/api/quiz",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "user-id": user.id
          },

          body: JSON.stringify(
            quizData
          )

        }
      )


      const data = await response.json()


      if (response.ok) {

        alert(
          "Quiz question added! 🎉"
        )

        resetForm()

        fetchQuestions()

      } else {

        alert(
          data.message ||
          "Failed to add question"
        )

      }

    } catch (error) {

      console.log(
        "Quiz Save Error:",
        error
      )

      alert(
        "Server error. Please try again."
      )

    }

  }


  // ==================== EDIT ====================

  const handleEdit = (quiz) => {

    setEditingId(quiz._id)

    setQuestion(quiz.question)

    setOption1(quiz.options[0] || "")
    setOption2(quiz.options[1] || "")
    setOption3(quiz.options[2] || "")
    setOption4(quiz.options[3] || "")

    setAnswer(quiz.answer)

    setExplanation(
      quiz.explanation || ""
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
        "Are you sure you want to delete this question?"
      )


    if (!confirmDelete) {
      return
    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/quiz/${id}`,
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
          "Quiz question deleted! 🗑️"
        )

        fetchQuestions()

      } else {

        alert(
          data.message ||
          "Failed to delete question"
        )

      }

    } catch (error) {

      console.log(
        "Quiz Delete Error:",
        error
      )

      alert(
        "Server error. Please try again."
      )

    }

  }


  // ==================== PAGE ====================

  return (

    <div className="admin-quiz-page">


      {/* ================= HEADER ================= */}

      <section className="admin-quiz-header">

        <p>
          🛡️ SAFESHIELD ADMIN
        </p>

        <h1>
          Quiz Management 🧠
        </h1>

        <span>
          Create and manage safety scenario questions.
        </span>

      </section>



      {/* ================= CONTENT ================= */}

      <section className="admin-quiz-content">


        {/* ================= TOP ================= */}

        <div className="quiz-top">

          <h2>
            Quiz Questions
          </h2>


          <div className="quiz-top-actions">

            <button
              className="add-question-btn"
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
                : "+ Add Question"}

            </button>


            <Link to="/admin">
              ← Back to Admin
            </Link>

          </div>

        </div>



        {/* ================= FORM ================= */}

        {showForm && (

          <form
            className="quiz-form"
            onSubmit={handleSubmit}
          >

            <h3>

              {editingId
                ? "Edit Quiz Question ✏️"
                : "Add New Quiz Question 🧠"}

            </h3>


            {/* QUESTION */}

            <label>
              Question
            </label>

            <textarea
              placeholder="Enter your safety question"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              required
            />



            {/* OPTION 1 */}

            <label>
              Option 1
            </label>

            <input
              type="text"
              placeholder="Enter option 1"
              value={option1}
              onChange={(e) =>
                setOption1(e.target.value)
              }
              required
            />



            {/* OPTION 2 */}

            <label>
              Option 2
            </label>

            <input
              type="text"
              placeholder="Enter option 2"
              value={option2}
              onChange={(e) =>
                setOption2(e.target.value)
              }
              required
            />



            {/* OPTION 3 */}

            <label>
              Option 3
            </label>

            <input
              type="text"
              placeholder="Enter option 3"
              value={option3}
              onChange={(e) =>
                setOption3(e.target.value)
              }
              required
            />



            {/* OPTION 4 */}

            <label>
              Option 4
            </label>

            <input
              type="text"
              placeholder="Enter option 4"
              value={option4}
              onChange={(e) =>
                setOption4(e.target.value)
              }
              required
            />



            {/* CORRECT ANSWER */}

            <label>
              Correct Answer
            </label>

            <select
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              required
            >

              <option value="">
                Select correct answer
              </option>

              <option value={option1}>
                {option1 || "Option 1"}
              </option>

              <option value={option2}>
                {option2 || "Option 2"}
              </option>

              <option value={option3}>
                {option3 || "Option 3"}
              </option>

              <option value={option4}>
                {option4 || "Option 4"}
              </option>

            </select>



            {/* EXPLANATION */}

            <label>
              Explanation
            </label>

            <textarea
              placeholder="Explain why this is the correct answer"
              value={explanation}
              onChange={(e) =>
                setExplanation(
                  e.target.value
                )
              }
            />



            {/* SAVE */}

            <button
              type="submit"
              className="save-question-btn"
            >

              {editingId
                ? "Update Question ✏️"
                : "Save Question 🎉"}

            </button>


            {editingId && (

              <button
                type="button"
                className="cancel-question-btn"
                onClick={resetForm}
              >
                Cancel Edit
              </button>

            )}

          </form>

        )}



        {/* ================= QUESTIONS ================= */}

        <div className="admin-question-list">


          {questions.length === 0 ? (

            <div className="no-questions">

              <div>
                🧠
              </div>

              <h3>
                No Quiz Questions Yet
              </h3>

              <p>
                Add your first safety scenario question.
              </p>

            </div>

          ) : (

            questions.map((quiz, index) => (

              <div
                className="admin-question-card"
                key={quiz._id}
              >


                <div className="question-number">
                  Q{index + 1}
                </div>


                <div className="question-info">

                  <h3>
                    {quiz.question}
                  </h3>


                  <div className="quiz-options">

                    {quiz.options.map(
                      (option, optionIndex) => (

                        <div
                          className={
                            option === quiz.answer
                              ? "quiz-option correct"
                              : "quiz-option"
                          }
                          key={optionIndex}
                        >

                          {option === quiz.answer
                            ? "✓ "
                            : `${optionIndex + 1}. `}

                          {option}

                        </div>

                      )
                    )}

                  </div>


                  {quiz.explanation && (

                    <p className="quiz-explanation">

                      💡 {quiz.explanation}

                    </p>

                  )}

                </div>


                <div className="question-actions">

                  <button
                    className="edit-question-btn"
                    onClick={() =>
                      handleEdit(quiz)
                    }
                  >
                    ✏️ Edit
                  </button>


                  <button
                    className="delete-question-btn"
                    onClick={() =>
                      handleDelete(quiz._id)
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

export default AdminQuiz