import { Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";

const App = () => {

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  // IF NOT LOGGED IN
  if (!token) {

    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // IF LOGGED IN
  return (

    <div className="flex">

      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-black text-white p-5 border-r border-zinc-800">

        <h1 className="text-3xl font-bold mb-10 text-indigo-500">
          HRMS
        </h1>

        <div className="flex flex-col gap-5 text-lg">

          <Link
            to="/dashboard"
            className="hover:text-indigo-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/employees"
            className="hover:text-indigo-400 transition"
          >
            Employees
          </Link>

          <Link
            to="/attendance"
            className="hover:text-indigo-400 transition"
          >
            Attendance
          </Link>

          <Link
            to="/leaves"
            className="hover:text-indigo-400 transition"
          >
            Leaves
          </Link>

          <button
            onClick={logout}
            className="mt-10 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-zinc-950 min-h-screen">

        <Routes>

          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/employees"
            element={<Employees />}
          />

          <Route
            path="/attendance"
            element={<Attendance />}
          />

          <Route
            path="/leaves"
            element={<Leaves />}
          />

          <Route
            path="*"
            element={<Navigate to="/dashboard" />}
          />

        </Routes>

      </div>

    </div>
  );
};

export default App;