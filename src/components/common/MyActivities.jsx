import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { FaMapMarkerAlt, FaVideo } from "react-icons/fa";
import LoadingScreen from "../../pages/LoadingScreen";

const MyActivities = () => {
  const [role, setRole] = useState("");
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch activities data from the API
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/activities/my`, {
        withCredentials: true,
      })
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch activities.");
        setLoading(false);
      });
  }, []);

  // Fetch user role
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/user/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.user && response.data.user.role) {
          setRole(response.data.user.role);
        } else {
          console.error("Role not found in user data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setRole(null);
      });
  }, []);

  // convert date and time
  const formattedDateTime = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString();

    return formattedDate;
  };

  const ViewActivity = (id) => {
    window.location.href = `/extracurricular activity/view?id=${encodeURIComponent(
      id
    )}`;
  };

  // show all activities if no search query
  const filteredActivities = searchQuery
    ? activities.filter(
        (activity) =>
          activity.activity_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          activity.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.stop.includes(searchQuery)
      )
    : activities;

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  return (
    <div className="min-h-screen p-6 pt-16 pl-10">
      {role === "admin" || role === "staff" || role === "coordinator" ? (
        <div>
          <a
            href="/create activity"
            className="flex flex-row items-center gap-2 text-blue-600 ml-7 mkfont-medium hover:text-blue-800 mt-7"
          >
            <h4 className="flex items-center gap-2">
              <IoIosAdd className="text-xl text-blue-600" />
              Add Activity
            </h4>
          </a>
        </div>
      ) : null}

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="overflow-hidden transition bg-white shadow-md rounded-xl hover:shadow-lg"
              >
                <img
                  src={activity.image_link}
                  alt={activity.activity_name}
                  className="object-cover w-full h-48 rounded-t-xl"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {activity.activity_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {formattedDateTime(activity.start)}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium">Registration deadline:</span>{" "}
                    {new Date(activity.registration_deadline) < new Date() ? (
                      <span className="font-semibold text-red-600">
                        Registration Closed
                      </span>
                    ) : (
                      formattedDateTime(activity.registration_deadline)
                    )}
                  </p>

                  {activity.mode === "online" ? (
                    <div className="flex items-center mt-2 text-blue-600">
                      <FaVideo className="w-5 h-5 mr-2" />
                      <a
                        href={activity.virtual_link}
                        className="hover:underline"
                      >
                        Virtual Event
                      </a>
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

          {/* no results message */}
          {filteredActivities.length === 0 && (
            <p className="mt-6 text-center text-gray-500">
              No activities found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyActivities;
