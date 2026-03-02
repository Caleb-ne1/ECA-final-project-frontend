import React from "react";

const DashboardHeader = ({ userData }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-blue-800">
          Hi, {userData.username}! 👋
        </h1>
        <p className="text-gray-600 text-sm">Today is {today}</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
