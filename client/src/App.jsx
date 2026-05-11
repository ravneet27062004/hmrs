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
      <div className="w-64 min-h-screen bg-black text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
         <Link to="/">HRMS</Link> 
        </h1>

        <div className="flex flex-col gap-4">

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/employees">Employees</Link>

          <Link to="/attendance">Attendance</Link>

          <Link to="/leaves">Leaves</Link>



        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-zinc-950 min-h-screen">

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/employees" element={<Employees />} />

          <Route path="/attendance" element={<Attendance />} />

          <Route path="/leaves" element={<Leaves />} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>

      </div>
    </div>
  );
};

export default App;