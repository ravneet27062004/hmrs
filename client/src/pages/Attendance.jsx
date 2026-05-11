import { useEffect, useState } from "react";
import API from "../services/api";

const Attendance = () => {

  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  // Fetch Attendance
  const fetchAttendance = async () => {

    try {

      const res = await API.get("/attendance");

      setAttendance(res.data);

    } catch (error) {

      console.log(error);
      alert("Failed to fetch attendance");
    }
  };

  // Fetch Employees
  const fetchEmployees = async () => {

    try {

      const res = await API.get("/employees");

      setEmployees(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // Mark Attendance
  const markAttendance = async () => {

    if (!employeeId) {
      return alert("Select Employee");
    }

    try {

      await API.post("/attendance", {
        employeeId,
        status: "Present",
      });

      alert("Attendance Marked");

      fetchAttendance();

      setEmployeeId("");

    } catch (error) {

      console.log(error);

      alert("Error marking attendance");
    }
  };

  useEffect(() => {

    fetchAttendance();
    fetchEmployees();

  }, []);

  return (

    <div className="min-h-screen bg-[#0B1120] text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Attendance
      </h1>

      {/* Mark Attendance */}

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">

        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 mb-4"
        >

          <option value="">
            Select Employee
          </option>

          {employees.map((emp) => (

            <option
              key={emp._id}
              value={emp._id}
            >
              {emp.name}
            </option>

          ))}

        </select>

        <button
          onClick={markAttendance}
          className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg"
        >
          Mark Attendance
        </button>

      </div>

      {/* Attendance Records */}

      <div className="grid gap-4">

        {attendance.map((item) => (

          <div
            key={item._id}
            className="bg-white/5 border border-white/10 p-4 rounded-xl"
          >

            <p className="text-lg font-semibold">
              {item.employeeId?.name || "No Name"}
            </p>

            <p className="text-green-400">
              Status: {item.status}
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {new Date(item.date).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Attendance;