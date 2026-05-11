import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const token = localStorage.getItem("token");

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAttendance = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/attendance`,
        {
          employeeId,
          status: "Present",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendance Marked");
      fetchAttendance();
    } catch (error) {
      console.log(error);
      alert("Error marking attendance");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>

      <div className="bg-zinc-900 p-4 rounded-xl mb-6">
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-600 mb-4"
        />

        <button
          onClick={markAttendance}
          className="bg-indigo-600 px-5 py-2 rounded"
        >
          Mark Attendance
        </button>
      </div>

      <div className="grid gap-4">
        {attendance.map((item) => (
          <div
            key={item._id}
            className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
          >
            <p>
              Employee: {item.employeeId?.name || "No Name"}
            </p>

            <p>Status: {item.status}</p>

            <p>
              Date: {new Date(item.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;