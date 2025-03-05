import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { FaMapMarkerAlt, FaVideo } from "react-icons/fa";
import LoadingScreen from "../../pages/LoadingScreen";

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/activities`)
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch activities.");
        setLoading(false);
      });
  }, []);

  const formattedDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const ViewActivity = (id) => {
    window.location.href = `/extracurricular activity/view?id=${encodeURIComponent(id)}`;
  };

  const filteredActivities = searchQuery
    ? activities.filter(
        (activity) =>
          activity.activity_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.stop.includes(searchQuery)
      )
    : activities;

  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-6 mt-16 bg-white">
      {/* Add Activity Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Activities</h2>
        <a
          href="/create activity"
          className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          <IoIosAdd className="text-xl" />
          Add Activity
        </a>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg mx-auto mb-6">
        <input
          type="text"
          placeholder="Search activities by name, location, or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Activity Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="overflow-hidden transition bg-white shadow-md rounded-xl hover:shadow-lg">
            <img src={activity.image_link} alt={activity.activity_name} className="object-cover w-full h-48 rounded-t-xl" />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900">{activity.activity_name}</h3>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Date:</span> {formattedDateTime(activity.start)}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Registration deadline:</span>{" "}
                {new Date(activity.registration_deadline) < new Date() ? (
                  <span className="font-semibold text-red-600">Registration Closed</span>
                ) : (
                  formattedDateTime(activity.registration_deadline)
                )}
              </p>

              {activity.mode === "online" ? (
                <div className="flex items-center mt-2 text-blue-600">
                  <FaVideo className="w-5 h-5 mr-2" />
                  <a href={activity.virtual_link} className="hover:underline">Virtual Event</a>
                </div>
              ) : (
                <div className="flex items-center mt-2 text-green-600">
                  <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                  <span>{activity.venue}</span>
                </div>
              )}

              <button
                onClick={() => ViewActivity(activity.id)}
                className="w-full px-4 py-2 mt-4 text-white transition bg-blue-950 hover:bg-blue-900"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredActivities.length === 0 && <p className="mt-6 text-center text-gray-500">No activities found</p>}
    </div>
  );
};

export default ManageActivities;

