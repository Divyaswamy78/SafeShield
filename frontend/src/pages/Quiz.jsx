import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "./Quiz.css"

const quizQuestions = [
  {
    question:
      "If you are walking alone and feel that someone is following you, what should you do?",
    options: [
      "Go directly to an isolated area",
      "Move toward a crowded and well-lit place",
      "Stop and confront the person",
      "Ignore the situation completely"
    ],
    answer:
      "Move toward a crowded and well-lit place",
    explanation:
      "Moving toward a crowded, well-lit place can help you stay safer and gives you access to other people who can assist you."
  },

  {
    question:
      "What is a good safety practice when using public transportation?",
    options: [
      "Keep your surroundings completely ignored",
      "Share your personal information with strangers",
      "Stay aware of your surroundings and keep important belongings secure",
      "Travel only in isolated areas"
    ],
    answer:
      "Stay aware of your surroundings and keep important belongings secure",
    explanation:
      "Staying aware and keeping your belongings secure can reduce avoidable risks while travelling."
  },

  {
    question:
      "What should you do if you need help during an unsafe situation?",
    options: [
      "Stay isolated and avoid everyone",
      "Seek help from trusted people or appropriate emergency services",
      "Keep the situation secret",
      "Move somewhere more isolated"
    ],
    answer:
      "Seek help from trusted people or appropriate emergency services",
    explanation:
      "Seeking help from trusted people or appropriate emergency services is an important part of responding safely to an emergency."
  },

  {
    question:
      "Which habit can improve your personal safety when travelling?",
    options: [
      "Plan your route and keep emergency contacts accessible",
      "Avoid telling anyone where you are going",
      "Walk through unfamiliar isolated areas",
      "Keep your phone switched off"
    ],
    answer:
      "Plan your route and keep emergency contacts accessible",
    explanation:
      "Planning your route and keeping emergency contacts accessible can help you respond more effectively if something unexpected happens."
  },

  {
    question:
      "What is the safest response if you feel uncomfortable in an unfamiliar place?",
    options: [
      "Stay there and ignore your feelings",
      "Move to a safer place and contact someone you trust",
      "Go somewhere more isolated",
      "Share your location with strangers"
    ],
    answer:
      "Move to a safer place and contact someone you trust",
    explanation:
      "Moving to a safer location and contacting someone you trust can help you respond calmly and get support when needed."
  }
]

function Quiz() {
  const [currentQuestion, setCurrentQuestion] =
    useState(0)

  const [selectedAnswer, setSelectedAnswer] =
    useState("")

  const [score, setScore] = useState(0)

  const [showResult, setShowResult] =
    useState(false)

  const [saving, setSaving] =
    useState(false)

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

  const saveScore = async (finalScore) => {
    if (!user?.id) {
      return
    }

    setSaving(true)

    try {
      const response = await fetch(
        "http://localhost:5000/api/progress/quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            score: finalScore
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        console.log(
          "Score Save Error:",
          data.message
        )
      }
    } catch (error) {
      console.log(
        "Quiz Score Error:",
        error
      )
    } finally {
      setSaving(false)
    }
  }

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) {
      return
    }

    setSelectedAnswer(answer)
  }

  const handleNext = async () => {
    if (!selectedAnswer) {
      return
    }

    const current =
      quizQuestions[currentQuestion]

    let updatedScore = score

    if (selectedAnswer === current.answer) {
      updatedScore = score + 1
      setScore(updatedScore)
    }

    const isLastQuestion =
      currentQuestion ===
      quizQuestions.length - 1

    if (isLastQuestion) {
      setShowResult(true)
      await saveScore(updatedScore)
      return
    }

    setCurrentQuestion(
      currentQuestion + 1
    )

    setSelectedAnswer("")
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setScore(0)
    setShowResult(false)
  }

  if (!savedUser || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  if (showResult) {
    const percentage = Math.round(
      (score / quizQuestions.length) * 100
    )

    let resultMessage = ""

    if (percentage >= 80) {
      resultMessage =
        "Excellent! You have strong safety awareness. 🛡️"
    } else if (percentage >= 50) {
      resultMessage =
        "Good effort! Keep learning and improving your safety awareness. 💪"
    } else {
      resultMessage =
        "Keep practicing! Review the lessons and try the quiz again. 📚"
    }

    return (
      <div className="quiz-page">
        <section className="quiz-result">

          <div className="result-icon">
            {percentage >= 80
              ? "🏆"
              : percentage >= 50
              ? "⭐"
              : "📚"}
          </div>

          <p className="quiz-tag">
            🧠 SAFETY QUIZ
          </p>

          <h1>
            Quiz Completed!
          </h1>

          <div className="score-circle">
            <strong>
              {percentage}%
            </strong>

            <span>
              Score
            </span>
          </div>

          <h2>
            {score} / {quizQuestions.length}
          </h2>

          <p className="result-message">
            {resultMessage}
          </p>

          {saving && (
            <p className="saving-score">
              Saving your score...
            </p>
          )}

          {percentage >= 80 && (
            <div className="badge-earned">
              🏆 Quiz Master Badge Earned!
            </div>
          )}

          <div className="result-actions">

            <button
              className="restart-btn"
              onClick={handleRestart}
            >
              🔄 Retake Quiz
            </button>

            <Link
              to="/dashboard"
              className="dashboard-btn"
            >
              📊 Dashboard
            </Link>

          </div>

        </section>
      </div>
    )
  }

  const current =
    quizQuestions[currentQuestion]

  const progress =
    ((currentQuestion + 1) /
      quizQuestions.length) *
    100

  return (
    <div className="quiz-page">

      <section className="quiz-container">

        <div className="quiz-header">

          <div>

            <p className="quiz-tag">
              🧠 SAFETY QUIZ
            </p>

            <h1>
              Test Your Safety Awareness
            </h1>

          </div>

          <div className="quiz-counter">
            Question{" "}
            {currentQuestion + 1}{" "}
            /{" "}
            {quizQuestions.length}
          </div>

        </div>

        <div className="quiz-progress">

          <div
            className="quiz-progress-bar"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

        <div className="question-card">

          <div className="question-number">
            Question {currentQuestion + 1}
          </div>

          <h2>
            {current.question}
          </h2>

          <div className="quiz-options">

            {current.options.map(
              (option, index) => (

                <button
                  key={index}
                  type="button"
                  className={
                    selectedAnswer === option
                      ? "quiz-option selected"
                      : "quiz-option"
                  }
                  onClick={() =>
                    handleAnswerSelect(option)
                  }
                  disabled={!!selectedAnswer}
                >

                  <span className="option-letter">
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <span>
                    {option}
                  </span>

                </button>

              )
            )}

          </div>

          {selectedAnswer && (

            <div
              className={
                selectedAnswer === current.answer
                  ? "quiz-explanation correct"
                  : "quiz-explanation incorrect"
              }
            >

              <div className="explanation-title">

                {selectedAnswer === current.answer
                  ? "✅ Correct Answer!"
                  : "❌ Incorrect Answer"}

              </div>

              <p>
                {current.explanation}
              </p>

            </div>

          )}

          <button
            type="button"
            className="next-question-btn"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >

            {currentQuestion ===
            quizQuestions.length - 1
              ? "Finish Quiz 🏆"
              : "Next Question →"}

          </button>

        </div>

        <div className="quiz-safety-note">

          <span>
            🛡️
          </span>

          <p>
            Remember: real-life safety situations
            can be different. Focus on awareness,
            getting to safety and seeking help.
          </p>

        </div>

      </section>

    </div>
  )
}

export default Quiz