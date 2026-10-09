import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Register.css"

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    // Check passwords
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMessage("Registration successful! 🎉")

        // Clear form
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      } else {
        setMessage(data.message)
      }

    } catch (error) {
      setMessage("Server error. Please try again.")
    }
  }

  return (
    <div className="register-page">

      <div className="register-container">

        <div className="register-header">
          <div className="register-logo">🛡️</div>

          <h1>Create Account</h1>

          <p>Join SafeShield and start your safety journey.</p>
        </div>

        <form
          className="register-form"
          onSubmit={handleRegister}
        >

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p className="login-text">
  Already have an account?{" "}
  <Link to="/login">
    Login
  </Link>
</p>

      </div>

    </div>
  )
}

export default Register