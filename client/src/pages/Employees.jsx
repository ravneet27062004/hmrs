import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch employees");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee Deleted");
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      <div className="grid gap-4">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-zinc-900 p-5 rounded-xl border border-zinc-700"
          >
            <h2 className="text-xl font-semibold">{emp.name}</h2>

            <p>Email: {emp.email}</p>
            <p>Department: {emp.department}</p>
            <p>Designation: {emp.designation}</p>
            <p>Salary: ₹{emp.salary}</p>

            <button
              onClick={() => deleteEmployee(emp._id)}
              className="mt-3 bg-red-600 px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;