import { useEffect, useState } from "react";
import API from "../services/api";

const Leaves = () => {

  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: "",
    reason: "",
    fromDate: "",
    toDate: "",
  });

  // Fetch Leaves
  const fetchLeaves = async () => {

    try {

      const res = await API.get("/leaves");

      setLeaves(res.data);

    } catch (error) {

      console.log(error);
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

  // Apply Leave
  const applyLeave = async () => {

    try {

      await API.post("/leaves", formData);

      alert("Leave Applied");

      fetchLeaves();

      setFormData({
        employeeId: "",
        reason: "",
        fromDate: "",
        toDate: "",
      });

    } catch (error) {

      console.log(error);

      alert("Error applying leave");
    }
  };

  // Update Leave Status
  const updateStatus = async (id, status) => {

    try {

      await API.put(`/leaves/${id}`, {
        status,
      });

      fetchLeaves();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchLeaves();
    fetchEmployees();

  }, []);

  return (

    <div className="min-h-screen bg-[#0B1120] text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Leave Management
      </h1>

      {/* Apply Leave Form */}

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">

        {/* Employee Dropdown */}

        <select
          value={formData.employeeId}
          onChange={(e) =>
            setFormData({
              ...formData,
              employeeId: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 mb-3"
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

        <input
          type="text"
          placeholder="Reason"
          value={formData.reason}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 mb-3"
          onChange={(e) =>
            setFormData({
              ...formData,
              reason: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={formData.fromDate}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 mb-3"
          onChange={(e) =>
            setFormData({
              ...formData,
              fromDate: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={formData.toDate}
          className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-700 mb-4"
          onChange={(e) =>
            setFormData({
              ...formData,
              toDate: e.target.value,
            })
          }
        />

        <button
          onClick={applyLeave}
          className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg"
        >
          Apply Leave
        </button>

      </div>

      {/* Leave Records */}

      <div className="grid gap-4">

        {leaves.map((leave) => (

          <div
            key={leave._id}
            className="bg-white/5 border border-white/10 p-4 rounded-xl"
          >

            <p className="text-lg font-semibold">
              {leave.employeeId?.name || "No Name"}
            </p>

            <p className="text-gray-300 mt-1">
              Reason: {leave.reason}
            </p>

            <p className="mt-1">
              Status:
              <span className="ml-2 text-indigo-400">
                {leave.status}
              </span>
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {leave.fromDate?.slice(0, 10)} → {leave.toDate?.slice(0, 10)}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  updateStatus(leave._id, "Approved")
                }
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(leave._id, "Rejected")
                }
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
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