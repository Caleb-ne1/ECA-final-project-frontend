import React from "react";
import { Clock } from "lucide-react"; 

const Timeline = ({ events }) => {
  return (
    <div className="bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Activity Timeline</h2>
      <div className="relative border-l-4 border-blue-500 pl-6">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="mb-6">
              <div className="absolute -left-5 w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                <Clock size={18} />
              </div>
              <p className="text-gray-700 font-semibold">{event.title}</p>
              <p className="text-sm text-gray-500">{event.description}</p>
              <p className="text-xs text-gray-400">{event.timestamp}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recent events</p>
        )}
      </div>
    </div>
  );
};

export default Timeline;
