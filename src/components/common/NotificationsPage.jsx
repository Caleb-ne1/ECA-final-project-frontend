import React, { useState } from "react";
import { CheckCircle, Trash2 } from "lucide-react"; // Importing Icons

const NotificationsPage = () => {
  // Sample Notifications Data
  const initialNotifications = [
    { id: 1, message: "🔔 Your event starts in 1 hour!", date: "2025-02-27", read: false },
    { id: 2, message: "📌 Your registration for Chess Club is approved!", date: "2025-02-26", read: false },
    { id: 3, message: "⚠️ Payment deadline approaching!", date: "2025-02-25", read: true },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Mark as Read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Delete Notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="w-full px-6 py-8 bg-white">
      <h1 className="mb-6 text-2xl font-bold text-blue-800">🔔 Notifications</h1>

      {/* Unread Notifications */}
      <section className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">Unread Notifications</h2>
        {notifications.filter((notif) => !notif.read).length === 0 ? (
          <p className="text-gray-500">No unread notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.filter((notif) => !notif.read).map((notif) => (
              <li
                key={notif.id}
                className="flex items-center justify-between p-4 bg-yellow-100 border rounded-lg"
              >
                <div>
                  <p className="text-gray-800">{notif.message}</p>
                  <p className="mt-1 text-sm text-gray-600">📅 {notif.date}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => markAsRead(notif.id)} className="text-green-600 hover:text-green-800">
                    <CheckCircle size={22} />
                  </button>
                  <button onClick={() => deleteNotification(notif.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={22} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Read Notifications */}
      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-800">Read Notifications</h2>
        {notifications.filter((notif) => notif.read).length === 0 ? (
          <p className="text-gray-500">No read notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.filter((notif) => notif.read).map((notif) => (
              <li
                key={notif.id}
                className="flex items-center justify-between p-4 bg-gray-100 border rounded-lg"
              >
                <div>
                  <p className="text-gray-700">{notif.message}</p>
                  <p className="mt-1 text-sm text-gray-500">📅 {notif.date}</p>
                </div>
                <button onClick={() => deleteNotification(notif.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={22} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default NotificationsPage;

