import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers, FaChalkboardTeacher, FaFire, FaUserPlus, FaChartLine } from "react-icons/fa";

const DashboardSummary = ({ attendanceRate }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0)
  const [recentRegistrations, setRecentRegistration] = useState(0)
  
  
  const getUserCount = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/user/count`)
      setTotalUsers(response.data.userCount);
    } catch (error) {
      console.error(response.error.message || error)
    }
  }

  const getActivitiesCount = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/count/activities`);
      setTotalActivities(response.data.activityCount);
    } catch (error) {
      console.error(response.error.message || error)
    }
  }

  // get recent summary of registration
  const getRecentRegistrationsSummary = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/user/recent/summary`)
      setRecentRegistration(response.data.last1Week)
    } catch (error) {
      console.error(response.error.message || error)
    }
  }

  useEffect(() => {
    getUserCount();
    getActivitiesCount();
    getRecentRegistrationsSummary();
  })
  const stats = [
    { icon: <FaUsers className="text-3xl text-blue-500" />, label: "Total Users", value: totalUsers },
    { icon: <FaChalkboardTeacher className="text-3xl text-green-500" />, label: "Total Activities", value: totalActivities },
    { icon: <FaUserPlus className="text-3xl text-purple-500" />, label: "Recent Registrations", value: recentRegistrations },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-6 bg-white sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center p-4 shadow-md">
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
