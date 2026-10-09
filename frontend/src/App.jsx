import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Learn from "./pages/Learn"
import SafetyTips from "./pages/SafetyTips"
import Emergency from "./pages/Emergency"

import Login from "./pages/Login"
import Register from "./pages/Register"

import Dashboard from "./pages/Dashboard"
import Quiz from "./pages/Quiz"
import LessonDetails from "./pages/LessonDetails"
import Certificate from "./pages/Certificate"

import Admin from "./pages/Admin"
import AdminUsers from "./pages/AdminUsers"
import AdminLessons from "./pages/AdminLessons"
import AdminQuiz from "./pages/AdminQuiz"
import AdminProgress from "./pages/AdminProgress"


// ==================== ADMIN PROTECTION ====================

function AdminRoute({ children }) {

  const savedUser =
    localStorage.getItem("safeShieldUser")


  if (!savedUser) {

    return (
      <Navigate
        to="/login"
        replace
      />
    )

  }


  let user

  try {

    user = JSON.parse(savedUser)

  } catch (error) {

    localStorage.removeItem(
      "safeShieldUser"
    )

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


  return children

}


// ==================== APP ====================

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>


        {/* ==================== PUBLIC ==================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/learn"
          element={<Learn />}
        />

        <Route
          path="/safety"
          element={<SafetyTips />}
        />

        <Route
          path="/emergency"
          element={<Emergency />}
        />


        {/* ==================== AUTH ==================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================== USER ==================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/lesson/:lessonId"
          element={<LessonDetails />}
        />

        <Route
          path="/certificate"
          element={<Certificate />}
        />


        {/* ==================== ADMIN ==================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/lessons"
          element={
            <AdminRoute>
              <AdminLessons />
            </AdminRoute>
          }
        />


        <Route
          path="/admin/quiz"
          element={
            <AdminRoute>
              <AdminQuiz />
            </AdminRoute>
          }
        />


        {/* ==================== WRONG URL ==================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
        <Route
  path="/admin/progress"
  element={
    <AdminRoute>
      <AdminProgress />
    </AdminRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  )

}

export default App