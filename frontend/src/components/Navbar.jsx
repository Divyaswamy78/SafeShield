import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar() {

  const navigate = useNavigate()

  const savedUser = localStorage.getItem("safeShieldUser")

  const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  )

  if (confirmLogout) {

    localStorage.removeItem("safeShieldUser")

    navigate("/login")
  }
}

  return (
    <nav className="navbar">

      <h2 className="logo">
        🛡️ SafeShield
      </h2>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/learn">
          Learn
        </Link>

        <Link to="/safety">
          Safety Tips
        </Link>

        <Link to="/emergency">
          Emergency
        </Link>

        {savedUser ? (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        ) : (

          <Link to="/login">
            Login
          </Link>

        )}

      </div>

    </nav>
  )
}

export default Navbar