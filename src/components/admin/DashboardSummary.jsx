import React from "react";
import { FaUsers, FaChalkboardTeacher, FaFire, FaUserPlus, FaChartLine } from "react-icons/fa";

const DashboardSummary = ({ totalStudents, totalActivities, popularActivity, recentRegistrations, attendanceRate }) => {
  const stats = [
    { icon: <FaUsers className="text-blue-500 text-3xl" />, label: "Total Users", value: totalStudents },
    { icon: <FaChalkboardTeacher className="text-green-500 text-3xl" />, label: "Total Activities", value: totalActivities },
    { icon: <FaUserPlus className="text-purple-500 text-3xl" />, label: "Recent Registrations", value: recentRegistrations },
    { icon: <FaChartLine className="text-yellow-500 text-3xl" />, label: "Attendance Rate", value: `${attendanceRate}%` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center shadow-md p-4">
          <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
          <div className="ml-4">
            <p className="text-gray-600">{stat.label}</p>
            <h2 className="text-xl font-bold">{stat.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
