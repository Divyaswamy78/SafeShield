import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import "./AdminUsers.css"

function AdminUsers() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


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


  // ==================== FETCH USERS ====================

  useEffect(() => {

    const fetchUsers = async () => {

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
          setError("")

        } else {

          setError(
            data.message ||
            "Failed to load users."
          )

        }

      } catch (error) {

        console.log(
          "Users Fetch Error:",
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

  }, [user.id])


  // ==================== PAGE ====================

  return (

    <div className="admin-users-page">


      {/* ================= HEADER ================= */}

      <section className="admin-users-header">

        <p>
          🛡️ SAFESHIELD ADMIN
        </p>

        <h1>
          User Management 👥
        </h1>

        <span>
          View registered users and their learning progress.
        </span>

      </section>



      {/* ================= CONTENT ================= */}

      <section className="users-container">


        {/* ================= TOP ================= */}

        <div className="users-top">

          <h2>
            Registered Users
          </h2>

          <Link to="/admin">
            ← Back to Admin
          </Link>

        </div>



        {/* ================= ERROR ================= */}

        {error && (

          <div className="users-message">

            <h3>
              Something went wrong 😕
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}



        {/* ================= LOADING ================= */}

        {!error && loading && (

          <div className="users-message">

            Loading users... 👥

          </div>

        )}



        {/* ================= EMPTY ================= */}

        {!error &&
        !loading &&
        users.length === 0 && (

          <div className="users-message">

            No users found.

          </div>

        )}



        {/* ================= TABLE ================= */}

        {!error &&
        !loading &&
        users.length > 0 && (

          <div className="users-table-wrapper">

            <table className="users-table">

              <thead>

                <tr>

                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Lessons
                  </th>

                  <th>
                    Quiz Score
                  </th>

                  <th>
                    Badges
                  </th>

                  <th>
                    Certificate
                  </th>

                </tr>

              </thead>


              <tbody>

                {users.map((userData) => (

                  <tr key={userData._id}>


                    {/* NAME */}

                    <td>
                      {userData.name}
                    </td>


                    {/* EMAIL */}

                    <td>
                      {userData.email}
                    </td>


                    {/* ROLE */}

                    <td>

                      {userData.role === "admin" ? (

                        <span className="admin-role">
                          👑 Admin
                        </span>

                      ) : (

                        <span className="user-role">
                          👤 User
                        </span>

                      )}

                    </td>


                    {/* LESSONS */}

                    <td>

                      {userData.completedLessons?.length || 0}
                      {" "}
                      / 3

                    </td>


                    {/* QUIZ */}

                    <td>

                      {userData.quizScore || 0}%

                    </td>


                    {/* BADGES */}

                    <td>

                      {userData.badges?.length || 0}

                    </td>


                    {/* CERTIFICATE */}

                    <td>

                      {userData.certificateUnlocked ? (

                        <span className="certificate-yes">
                          ✓ Unlocked
                        </span>

                      ) : (

                        <span className="certificate-no">
                          Locked
                        </span>

                      )}

                    </td>


                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>

  )

}

export default AdminUsers