import React, { useState } from "react";
import { Calendar } from "lucide-react";

const UpcomingActivities = ({ activities }) => {
  const [filter, setFilter] = useState("7 Days");

  // filter activities based on selected timeframe
  const filteredActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.date);
    const today = new Date();
    const nextWeek = new Date(today);
    const nextMonth = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    nextMonth.setMonth(today.getMonth() + 1);

    return filter === "7 Days"
      ? activityDate <= nextWeek
      : activityDate <= nextMonth;
  });

  return (
    <div className="bg-white p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📅 Upcoming Activities</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1 focus:ring focus:ring-blue-300"
        >
          <option value="7 Days">Next 7 Days</option>
          <option value="1 Month">Next 1 Month</option>
        </select>
      </div>

      <ul>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <li key={index} className="mb-4 flex items-center gap-4 border-b pb-3">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{activity.name}</p>
                <p className="text-sm text-gray-500">{activity.date} | {activity.time}</p>
                <p className="text-sm text-gray-600">{activity.location}</p>
              </div>
              <button className="border-2 border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition">
                View
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No upcoming activities</p>
        )}
      </ul>
    </div>
  );
};

export default UpcomingActivities;

