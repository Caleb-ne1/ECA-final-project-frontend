import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
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
    const userRole = sessionStorage.getItem("user");

    if (userRole) {
      const userData = JSON.parse(userRole);
      setRole(userData.role);
    }
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
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className=" text-white shadow-lg p-4 flex flex-row justify-between fixed w-full top-0 z-40 navbar">
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
        <div className="flex justify-between items-center">
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex space-x-4 items-center text-gray-700`}
          >
            {/* Dynamic Navigation */}
            {role === "student" || role === "user" ? (
              <ul className="space-y-2 md:space-y-0 md:flex md:space-x-4 text-white">
                <li>
                  <a href="/home" className="hover:text-blue-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/student-dashboard" className="hover:text-blue-500">
                    Student Dashboard
                  </a>
                </li>
                <li>
                  <a href="/extracurricular activities">
                    Available Activities
                  </a>
                </li>
                <li>
                  <a href="">My Activities</a>
                </li>
                <li>
                  <a href="">Calendar</a>
                </li>
                <li>
                  <a href="">Announcements</a>
                </li>
              </ul>
            ) : role === "teacher" || role === "coordinator" ? (
              <ul className="space-y-2 md:space-y-0 md:flex md:space-x-4">
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/student-dashboard">Teacher Dashboard</a>
                </li>
                <li>
                  <a href="/activities">My Activities</a>
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
                  <a href="/admin-dashboard">Admin Dashboard</a>
                </li>
                <li>
                  <a href="">Manage Activities</a>
                </li>
                <li>
                  <a href="/manage_users">Manage Users</a>
                </li>
                <li>
                  <a href="">Logs</a>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative group ">
        <FaUser className="text-white w-6 h-6 cursor-pointer" />
        <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg py-2 w-40 right-0">
          <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <a href="user/profile">Profile</a>
          </p>
          <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Settings
          </p>
          <p
            className="px-4 py-2 text-sm text-red-500 hover:bg-red-100 cursor-pointer"
            onClick={userLogout}
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;