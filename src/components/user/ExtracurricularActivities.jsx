import React, { useState } from "react";
import { FaMapMarkerAlt, FaVideo } from "react-icons/fa";

const activities = [
  {
    id: 1,
    name: "Campus Yoga Workshop",
    date: "2024-12-31",
    time: "10:00 AM",
    location: "Zetech university, Main Campus",
    image:
      "https://img.freepik.com/free-photo/african-woman-doing-yoga-studio-pink-background_273443-746.jpg?ga=GA1.1.494808097.1735222370&semt=ais_hybrid",
    isVirtual: false,
  },
  {
    id: 2,
    name: "Virtual Coding",
    date: "2024-12-25",
    time: "2:00 PM",
    link: "https://example.com",
    image:
      "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?ga=GA1.1.494808097.1735222370&semt=ais_hybrid",
    isVirtual: true,
  },
  {
    id: 3,
    name: "Art & Design Exhibition",
    date: "2025-01-15",
    time: "5:00 PM",
    location: "Mangu Campus, L2004",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-art-exhibition-facebook-cover_23-2149508171.jpg?ga=GA1.1.494808097.1735222370&semt=ais_hybrid",
    isVirtual: false,
  },
  {
    id: 4,
    name: "Alumni Networking Event",
    date: "2024-12-10",
    time: "6:00 PM",
    location: "Thika Road Campus, University Auditorium",
    image:
      "https://img.freepik.com/premium-photo/business-executives-interacting-with-each-other-break_107420-73053.jpg?ga=GA1.1.494808097.1735222370&semt=ais_hybrid",
    isVirtual: false,
  },
  {
    id: 5,
    name: "Online Health and Wellness Webinar",
    date: "2024-12-20",
    time: "4:00 PM",
    link: "https://example.com/health-webinar",
    image: "https://img.freepik.com/free-vector/webinar-template-world-health-day-celebration_23-2150200421.jpg?ga=GA1.1.494808097.1735222370&semt=ais_hybrid",
    isVirtual: true,
  },
];


const ExtracurricularActivities = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.date.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <div className="max-w-7xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg overflow-hidden"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {activity.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Date:</span> {activity.date}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Time:</span> {activity.time}
                </p>
                {activity.isVirtual ? (
                  <div className="flex items-center mt-2 text-blue-600">
                    <FaVideo className="w-5 h-5 mr-2" />
                    <span>Virtual Event</span>
                  </div>
                ) : (
                  <div className="flex items-center mt-2 text-green-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                    <span>{activity.location}</span>
                  </div>
                )}
                <button className="mt-4 px-4 py-2 bg-blue-950	 text-white rounded-lg hover:bg-blue-900 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* no results message */}
        {filteredActivities.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No activities match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExtracurricularActivities;
