import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaVideo, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ExtracurricularActivities = () => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 6;

  useEffect(() => {
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

  const formattedDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const ViewActivity = (id) => {
    window.location.href = `/extracurricular activity/view?id=${encodeURIComponent(id)}`;
  };

  const filteredActivities = searchQuery
    ? activities.filter((activity) =>
        activity.activity_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.stop.includes(searchQuery)
      )
    : activities;

  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading activities...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search activities by name, location, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentActivities.map((activity) => (
            <div key={activity.id} className="overflow-hidden bg-white rounded-lg">
              <img src={activity.image_link} alt={activity.activity_name} className="object-cover w-full h-48" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{activity.activity_name}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Date:</span> {formattedDateTime(activity.start)} - {formattedDateTime(activity.start)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {new Date(activity.registration_deadline) < new Date() ? (
                    <span className="font-semibold text-red-600">Registration Closed</span>
                  ) : (
                    formattedDateTime(activity.registration_deadline)
                  )}
                </p>
                {activity.mode === "online" ? (
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
                <button
                  onClick={() => ViewActivity(activity.id)}
                  className="p-2 mt-4 text-white transition rounded-full bg-blue-950 hover:bg-blue-900"
                  title="View Details"
                >
                  <FaEye size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && <p className="mt-6 text-center text-gray-500">No activities match your search.</p>}

        {/* Pagination Controls */}
        {filteredActivities.length > activities && (
        <div className="flex justify-center mt-6 mb-6 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 text-white bg-blue-950 rounded-lg ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
            }`}
          >
            <FaArrowLeft className="mr-2" />
          </button>

          <span className="px-4 py-2 font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 text-white bg-blue-950 rounded-lg ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
            }`}
          >
            <FaArrowRight className="ml-2" />
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default ExtracurricularActivities;

