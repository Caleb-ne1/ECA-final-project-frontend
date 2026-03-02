import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaMapMarkerAlt, FaVideo, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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
    ? activities.filter((activity) =>
        activity.activity_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.stop.includes(searchQuery)
      )
    : activities;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  if (loading) {
    return <div className="text-center text-gray-500">Loading activities...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="pt-16 pl-10">
      <a
        href="/create activity"
        className="flex items-center gap-2 font-medium text-blue-600 ml-7 hover:text-blue-800 mt-7"
      >
        <IoIosAdd className="text-xl text-blue-600" />
        Add Activity
      </a>

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
              <div key={activity.id} className="overflow-hidden bg-white">
                <img
                  src={activity.image_link}
                  alt={activity.activity_name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{activity.activity_name}</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {formattedDateTime(activity.start)} - {formattedDateTime(activity.start)}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Registration deadline:</span> {new Date(activity.registration_deadline) < new Date() ? (
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

          {filteredActivities.length === 0 && (
            <p className="mt-6 text-center text-gray-500">No activities</p>
          )}

          <div className="flex justify-center gap-4 mt-6">
            <button
              className={`p-2 rounded-full bg-gray-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaArrowLeft size={20} />
            </button>
            <span className="self-center text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`p-2 rounded-full bg-gray-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"}`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;


