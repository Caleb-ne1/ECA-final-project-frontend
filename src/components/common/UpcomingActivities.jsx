import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const UpcomingActivities = () => {
  const [filter, setFilter] = useState("7days");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter activities based on selected timeframe
  useEffect(() => {
    const filterActivities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/upcoming/activities?filter=${filter}`
        );
        setFilteredActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error.message);
      } finally {
        setLoading(false);
      }
    };
    filterActivities();
  }, [filter]);

  // Format date and time
  const formattedDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formattedTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ViewActivity = (id) => {
    window.location.href = `/extracurricular activity/view?id=${encodeURIComponent(id)}`;
  };

  return (
    <div className="shadow-lg overflow-hidden mt-5 p-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="" size={20} />
            Upcoming Activities
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 bg-white/20 border border-white/30 rounded-md focus:ring-2 focus:ring-white/50 focus:outline-none"
          >
            <option value="7days" className="text-gray-800">Next 7 Days</option>
            <option value="1month" className="text-gray-800">Next 1 Month</option>
          </select>
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredActivities.length > 0 ? (
          <ul className="space-y-3">
            {filteredActivities.map((activity) => (
              <motion.li 
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div 
                  className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => ViewActivity(activity.id)}
                >
                  <div className="flex-shrink-0 p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {activity.activity_name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formattedDate(activity.start)} • {formattedTime(activity.start)}</span>
                      </div>
                      {activity.venue && (
                        <span className="truncate">
                          {activity.venue}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Calendar className="mx-auto" size={40} />
            </div>
            <p className="text-gray-500">No upcoming activities found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingActivities;
