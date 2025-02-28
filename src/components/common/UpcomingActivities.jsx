import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import axios from "axios";

const UpcomingActivities = () => {
  const [filter, setFilter] = useState("7days");
  const [filteredActivities, setFilteredActivities] = useState([]);
  
  // filter activities based on selected timeframe
  useEffect(() => {
  const filterActivities = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/upcoming/activities?filter=${filter}`)
      setFilteredActivities(response.data)
    } catch (error) {
      console.error(resposne.error.message)
    }
  }
  filterActivities();
  }, [])
 
  // convert date and time
  const formattedDateTime = (dateString) => {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleString();
    
    return formattedDate;
    
  }

  const ViewActivity = (id) => {
    window.location.href = `/extracurricular activity/view?id=${encodeURIComponent(id)}`
  }

  return (
    <div className="p-6 bg-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">📅 Upcoming Activities</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border rounded focus:ring focus:ring-blue-300"
        >
          <option value="7days">Next 7 Days</option>
          <option value="1month">Next 1 Month</option>
        </select>
      </div>

      <ul>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <li className="flex items-center gap-4 pb-3 mb-4 border-b">
              <div className="p-3 text-white bg-blue-500 rounded-full">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{activity.activity_name}</p>
                <p className="text-sm text-gray-500">{formattedDateTime(activity.start)}</p>
                <p className="text-sm text-gray-600">{activity.venue}</p>
              </div>
              <button className="px-4 py-1 text-blue-500 transition border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white" onClick={() => ViewActivity(activity.id)}>
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

