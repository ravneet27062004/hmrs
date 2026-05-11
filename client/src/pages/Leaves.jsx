import { useEffect, useState } from "react";
import axios from "axios";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    reason: "",
    fromDate: "",
    toDate: "",
  });

  const token = localStorage.getItem("token");

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/leaves`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeaves(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyLeave = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/leaves`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Leave Applied");
      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Error applying leave");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/leaves/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Leaves</h1>

      <div className="bg-zinc-900 p-5 rounded-xl mb-6">
        <input
          type="text"
          placeholder="Employee ID"
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-3"
          onChange={(e) =>
            setFormData({ ...formData, employeeId: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Reason"
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-3"
          onChange={(e) =>
            setFormData({ ...formData, reason: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-3"
          onChange={(e) =>
            setFormData({ ...formData, fromDate: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-3"
          onChange={(e) =>
            setFormData({ ...formData, toDate: e.target.value })
          }
        />

        <button
          onClick={applyLeave}
          className="bg-indigo-600 px-5 py-2 rounded"
        >
          Apply Leave
        </button>
      </div>

      <div className="grid gap-4">
        {leaves.map((leave) => (
          <div
            key={leave._id}
            className="bg-zinc-900 p-4 rounded-xl border border-zinc-700"
          >
            <p>Employee ID: {leave.employeeId}</p>
            <p>Reason: {leave.reason}</p>
            <p>Status: {leave.status}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => updateStatus(leave._id, "Approved")}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(leave._id, "Rejected")}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaves;