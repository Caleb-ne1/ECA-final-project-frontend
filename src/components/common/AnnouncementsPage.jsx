import React from "react";

const AnnouncementsPage = () => {
  // Sample Announcements Data (Hardcoded)
  const announcements = [
    {
      id: 1,
      title: "📢 Sports Day is Coming!",
      message: "Join us for an exciting sports event on March 15th. Register now!",
      date: "2025-03-01",
    },
    {
      id: 2,
      title: "📚 New Coding Workshop!",
      message: "Learn React and Node.js in our upcoming workshop. Limited slots available!",
      date: "2025-02-28",
    },
    {
      id: 3,
      title: "🎉 Drama Club Auditions",
      message: "Auditions for the school drama club are open! Sign up before March 10th.",
      date: "2025-02-25",
    },
  ];

  return (
    <div className="w-full px-6 py-8 bg-white">
      <h1 className="mb-6 text-2xl font-bold text-blue-800">📢 Announcements</h1>

      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements available.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li
              key={announcement.id}
              className="p-4 transition bg-gray-100 border rounded-lg hover:bg-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">{announcement.title}</h2>
              <p className="mt-1 text-gray-700">{announcement.message}</p>
              <p className="mt-2 text-sm text-gray-500">📅 {announcement.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnnouncementsPage;

