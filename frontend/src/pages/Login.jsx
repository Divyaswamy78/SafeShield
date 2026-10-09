import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (response.ok) {

        localStorage.setItem(
          "safeShieldUser",
          JSON.stringify(data.user)
        )

        setMessage("Login successful! 🎉")

        navigate("/dashboard")

      } else {

        setMessage(data.message)

      }

    } catch (error) {

      console.log("Login Error:", error)

      setMessage("Server error. Please try again.")

    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-header">

          <div className="login-logo">
            🛡️
          </div>

          <h1>Welcome Back</h1>

          <p>
            Login to continue learning with SafeShield.
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="register-text">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Login