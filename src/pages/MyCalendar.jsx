import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiCalendar, FiArrowRight, FiInfo } from "react-icons/fi";

// Set the moment localizer
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/calendar/activities`
        );

        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.activity_name,
          start: new Date(event.start),
          end: new Date(event.stop),
          description: event.description || "No description available",
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const EventComponent = ({ event }) => (
    <div className="p-1">
      <strong className="block truncate">{event.title}</strong>
      <div className="flex items-center text-xs text-gray-600 mt-1">
        <FiInfo className="mr-1" />
        <span className="truncate">{event.description}</span>
      </div>
    </div>
  );

  // Handle event click
  const handleSelectEvent = (event) => {
    navigate(`/extracurricular activity/view?id=${encodeURIComponent(event.id)}`);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 mt-16">
      <div className="max-w-6xl mx-auto bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiCalendar className="text-2xl" />
              <h1 className="text-2xl font-bold">Activity Calendar</h1>
            </div>
          </div>
          <p className="mt-2 opacity-90">
            View and manage all scheduled extracurricular activities
          </p>
        </div>

        {/* Calendar Container */}
        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              style={{ height: 600 }}
              components={{
                event: EventComponent,
              }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: "#4f46e5",
                  borderColor: "#4338ca",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                },
              })}
              popup
            />
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Click on an event for more details
          </div>
          <button
            onClick={() => navigate("/extracurricular activities")}
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Activities <FiArrowRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;





