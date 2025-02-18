import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaVideo } from "react-icons/fa";

const ExtracurricularActivities = () => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    // fetch activities data from the API
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/activities`) 
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch activities.");
        setLoading(false); 
      });
  }, []); 

  // convert date and time
  const formattedDateTime = (dateString) => {
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleString();
    
    return formattedDate;
    
  }

  const ViewActivity = (id) => {
    window.location.href = `/extracurricular activity/view?id=${encodeURIComponent(id)}`
  }
  
  // show all activities if no search query
  const filteredActivities = searchQuery
    ? activities.filter(
        (activity) =>
          activity.activity_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.stop.includes(searchQuery)
      )
    : activities;

  if (loading) {
    return <div className="text-center text-gray-500">Loading activities...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search activities by name, location, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
          />
        </div>

        {/* activity grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="overflow-hidden bg-white rounded-lg">
              <img
                src={activity.image_link}
                alt={activity.activity_name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{activity.activity_name}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Date:</span> { formattedDateTime(activity.start) } -   { formattedDateTime(activity.start) }
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Registration deadline:</span> { formattedDateTime(activity.registration_deadline)}
                </p>
                {activity.mode == "online" ? (
                  <div className="flex items-center mt-2 text-blue-600">
                    <FaVideo className="w-5 h-5 mr-2" />
                    <a href={activity.virtual_link}>Virtual Event</a>
                  </div>
                ) : (
                  <div className="flex items-center mt-2 text-green-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                    <span>{activity.venue}</span>
                  </div>
                )}
                <button className="px-4 py-2 mt-4 text-white transition rounded-lg bg-blue-950 hover:bg-blue-900" onClick={() => ViewActivity(activity.id)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* no results message */}
        {filteredActivities.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            No activities match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExtracurricularActivities;

