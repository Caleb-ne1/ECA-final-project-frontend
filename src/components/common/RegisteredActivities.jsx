import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { FaMapMarkerAlt, FaVideo, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RegisteredActivities = () => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/registered-activities`,
        { withCredentials: true }
      )
      .then((response) => {
        setActivities(response.data.activities);
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
    window.location.href = `/extracurricular activity/view?id=${encodeURIComponent(
      id
    )}`;
  };

  const filteredActivities = searchQuery
    ? activities.filter(
      (activity) =>
        activity.Activity.activity_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        activity.Activity.venue
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        activity.Activity.stop.includes(searchQuery)
    )
    : activities;

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading activities...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="pt-16">
      <div className="min-h-screen p-6 mt-16">
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
            {paginatedActivities.map((activity) => (
              <div key={activity.id} className="overflow-hidden bg-white">
                <img
                  src={activity.Activity.image_link}
                  alt={activity.Activity.activity_name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {activity.Activity.activity_name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {formattedDateTime(activity.Activity.start)} - {formattedDateTime(activity.Activity.start)}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Registration deadline:</span> {new Date(activity.Activity.registration_deadline) < new Date() ? (
                      <span className="font-semibold text-red-600">Registration Closed</span>
                    ) : (
                      formattedDateTime(activity.Activity.registration_deadline)
                    )}
                  </p>
                  {activity.mode === "online" ? (
                    <div className="flex items-center mt-2 text-blue-600">
                      <FaVideo className="w-5 h-5 mr-2" />
                      <a href={activity.Activity.virtual_link}>Virtual Event</a>
                    </div>
                  ) : (
                    <div className="flex items-center mt-2 text-green-600">
                      <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                      <span>{activity.Activity.venue}</span>
                    </div>
                  )}
                  <button
                    onClick={() => ViewActivity(activity.Activity.id)}
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

          {/* Pagination Controls */}
          {filteredActivities.length > itemsPerPage && (
            <div className="flex items-center justify-center mt-8 space-x-2">
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${currentPage === 1
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                    : "text-white bg-blue-950 hover:bg-blue-900 shadow-md"
                  }`}
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Calculate which page numbers to show
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <React.Fragment key={pageNum}>
                      {/* Leading ellipsis */}
                      {(i === 0 && pageNum > 1) && (
                        <span className="px-2 text-gray-500">...</span>
                      )}

                      {/* Page number button */}
                      <button
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${currentPage === pageNum
                            ? "bg-blue-950 text-white font-medium shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {pageNum}
                      </button>

                      {/* Trailing ellipsis */}
                      {(i === 4 && pageNum < totalPages) && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${currentPage === totalPages
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                    : "text-white bg-blue-950 hover:bg-blue-900 shadow-md"
                  }`}
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredActivities;


