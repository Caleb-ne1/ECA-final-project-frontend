import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch user role
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/user/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data?.user?.role) {
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

  // Logout
  const userLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        sessionStorage.removeItem("user");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 z-40 flex flex-row justify-between w-full p-4 text-white shadow-lg navbar">
      <div>
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none toggle_menu_btn"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
        <div className="flex items-center justify-between">
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex space-x-4 items-center text-gray-700`}
          >
            {/* Dynamic Navigation */}
            {role === "student" || role === "user" ? (
              <ul className="space-y-2 text-white md:space-y-0 md:flex md:space-x-4">
                <li>
                  <a href="/home" className="hover:text-blue-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/UserDashboard" className="hover:text-blue-500">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/extracurricular activities">
                    Available Activities
                  </a>
                </li>
                <li>
                  <a href="/my/activities">My activities</a>
                </li>
                <li>
                  <a href="">Calendar</a>
                </li>
                <li>
                  <a href="/announcements">Announcements</a>
                </li>
              </ul>
            ) : role === "teacher" || role === "coordinator" ? (
              <ul className="space-y-2 md:space-y-0 md:flex md:space-x-4">
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/my">Dashboard</a>
                </li>
                <li>
                  <a href="">Available Activities</a>
                </li>
                <li>
                  <a href="/my/activities">My activities</a>
                </li>
                <li>
                  <a href="">Calendar</a>
                </li>
                <li>
                  <a href="">Reports</a>
                </li>
              </ul>
            ) : role === "admin" ? (
              <ul className="space-y-2 md:space-y-0 md:flex md:space-x-4">
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/admin-dashboard">Dashboard</a>
                </li>
                <li>
                  <a href="/my/activities">My activities</a>
                </li>
                <li>
                  <a href="/manage activities">Manage Activities</a>
                </li>
                <li>
                  <a href="/manage_users">Manage Users</a>
                </li>
                <li>
                  <a href="">Reports</a>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      {/* Notification & Profile Section */}
      <div className="flex items-center gap-4">
        <a href="/notifications">
          <IoIosNotifications className="w-8 h-8 text-white cursor-pointer" />
        </a>
        <div className="relative group">
          <FaUser className="w-8 h-8 text-white cursor-pointer" />
          <div className="absolute right-0 hidden w-40 py-2 bg-white rounded-lg shadow-lg group-hover:block">
            <p className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              <a href="user/profile">Profile</a>
            </p>
            <p className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
              Settings
            </p>
            <p
              className="px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-red-100"
              onClick={userLogout}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
