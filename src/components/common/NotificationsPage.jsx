import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { CheckCircle, Trash2, Bell, BellOff, MailCheck, MailOpen } from "lucide-react";
import { format } from "date-fns";
import LoadingScreen from "../../pages/LoadingScreen";

// connect to the backend Socket.IO server
const socket = io(import.meta.env.VITE_APP_API_URL, { withCredentials: true });

// function to map notification types to labels and colors
const getNotificationTypeDetails = (type) => {
  socket.on("hello", (message) => console.log(message));
  
  const types = {
    REGISTRATION_CONFIRMATION: { 
      label: "Registration", 
      color: "bg-green-100 text-green-800",
      icon: <MailCheck className="text-green-500" size={18} />
    },
    ACTIVITY_UPDATE: { 
      label: "Activity Update", 
      color: "bg-blue-100 text-blue-800",
      icon: <Bell className="text-blue-500" size={18} />
    },
    REMINDER: { 
      label: "Reminder", 
      color: "bg-yellow-100 text-yellow-800",
      icon: <Bell className="text-yellow-500" size={18} />
    },
    CANCELLATION: { 
      label: "Cancellation", 
      color: "bg-red-100 text-red-800",
      icon: <BellOff className="text-red-500" size={18} />
    },
    NEW_ACTIVITY: { 
      label: "New Activity", 
      color: "bg-purple-100 text-purple-800",
      icon: <Bell className="text-purple-500" size={18} />
    },
  };

  return types[type] || { 
    label: "Unknown", 
    color: "bg-gray-100 text-gray-800",
    icon: <Bell className="text-gray-500" size={18} />
  };
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("unread");
  const audioRef = useRef(null);

  // fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/notifications/user`, {withCredentials: true});
        setNotifications(response.data.data);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Listen for real-time notifications from Socket.IO
  useEffect(() => {
    socket.on("notification", (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
      if (audioRef.current) {
        audioRef.current.play();
      }
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_APP_API_URL}/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif 
        )
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/notifications/${id}/delete`);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const formatDate = (isoString) => {
    return format(new Date(isoString), "MMM dd, yyyy 'at' h:mm a");
  };

  const unreadNotifications = notifications.filter((notif) => !notif.isRead);
  const readNotifications = notifications.filter((notif) => notif.isRead);

  return (
    <div className="min-h-screen mt-16">
      {/* Audio Element for Notification Sound */}
      <audio ref={audioRef} src="../../assets/notification.wav" preload="auto"></audio>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="font-bold text-gray-900 flex items-center justify-center gap-3">
            <Bell className="text-indigo-600" size={28} />
            {notifications.length} total notifications
          </p>
        </div>

        {loading && <LoadingScreen />}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${activeTab === "unread" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("unread")}
              >
                <MailOpen size={18} />
                Unread ({unreadNotifications.length})
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm flex items-center gap-2 ${activeTab === "read" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("read")}
              >
                <MailCheck size={18} />
                Read ({readNotifications.length})
              </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {(activeTab === "unread" ? unreadNotifications : readNotifications).length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="mx-auto text-gray-400" size={48} />
                  <p className="mt-4 text-gray-500">
                    No {activeTab} notifications
                  </p>
                </div>
              ) : (
                (activeTab === "unread" ? unreadNotifications : readNotifications).map((notif) => {
                  const { label, color, icon } = getNotificationTypeDetails(notif.type);

                  return (
                    <div 
                      key={notif.id} 
                      className={`p-4 rounded-lg shadow-sm border ${notif.isRead ? "bg-white" : "bg-indigo-50 border-indigo-100"}`}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2 mb-2">
                          {icon}
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${color}`}>
                            {label}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(notif.createdAt)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {!notif.isRead && (
                            <button 
                              onClick={() => markAsRead(notif.id)} 
                              className="text-gray-500 hover:text-green-600 transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle size={20} />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notif.id)} 
                            className="text-gray-500 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-gray-900">
                        {notif.title}
                      </h3>
                      <p className="mt-1 text-gray-700">
                        {notif.message}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;




