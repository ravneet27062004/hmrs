import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUsers,
    FaCalendarCheck,
    FaFileAlt,
    FaSignOutAlt
} from "react-icons/fa";

import API from "../services/api";

const Dashboard = () => {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token = localStorage.getItem("token");

    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalLeaves: 0,
        totalAttendanceRecords: 0
    });

    const fetchStats = async () => {

        try {

            const res = await API.get(
                "/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <div className="min-h-screen bg-[#0B1120] text-white px-6 py-8">

            {/* Background Blur */}

            <div className="fixed inset-0 -z-10 pointer-events-none">

                <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-indigo-800/30 to-transparent rounded-full blur-3xl" />

                <div className="absolute right-10 bottom-10 w-[250px] h-[150px] bg-gradient-to-bl from-indigo-700/30 to-transparent rounded-full blur-2xl" />

            </div>

            {/* Top Navbar */}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 ">

                <div>

                    <h1 className="text-4xl font-bold ">
                        Welcome {user?.name}
                    </h1>

                    <p className="text-gray-400 mt-2 text-2xl">
                        Role: {user?.role}
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full transition "
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

            {/* Dashboard Cards */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Employees */}

                <div className="bg-white/6 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-400">
                                Employees
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {stats.totalEmployees}
                            </h2>

                        </div>

                        <div className="bg-indigo-200/20 p-4 rounded-full">

                            <FaUsers className="text-3xl text-indigo-400" />

                        </div>

                    </div>

                </div>

                {/* Leaves */}

                <div className="bg-white/6 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-400">
                                Leaves
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {stats.totalLeaves}
                            </h2>

                        </div>

                        <div className="bg-pink-500/20 p-4 rounded-full">

                            <FaFileAlt className="text-3xl text-pink-200" />

                        </div>

                    </div>

                </div>

                {/* Attendance */}

                <div className="bg-white/6 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-400">
                                Attendance
                            </p>

                            <h2 className="text-4xl font-bold mt-3">
                                {stats.totalAttendanceRecords}
                            </h2>

                        </div>

                        <div className="bg-green-500/20 p-4 rounded-full">

                            <FaCalendarCheck className="text-3xl text-green-200" />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;