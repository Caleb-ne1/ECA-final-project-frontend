import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        { username, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const userData = response.data.user;
      sessionStorage.setItem("user", JSON.stringify(userData));

      const userRole = response.data.user.role;

      if (userRole === "student" || userRole === "user") {
        navigate("/UserDashboard");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "teacher" || userRole === "coordinator") {
        navigate("/staff-dashboard");
      } else {
        setError("Unknown role. Please contact support.");
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        window.location.href = "/registration_pending";
      } else {
        setError("Invalid Login. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white login-container">
      <div className="left_container">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg focus-within:border-blue-500">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full ml-2 bg-transparent outline-none"
              required
            />
          </div>

          <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg focus-within:border-blue-500">
            <FaLock className="text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full ml-2 bg-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
             Log in
          </button>
        </form>
        <a
          href="/enter_your_email"
          className="pt-4 text-sm font-medium text-blue-500 underline hover:text-blue-700"
        >
          Forgot password?
        </a>
      </div>
      <div className="right_container"></div>
    </div>
  );
};

export default Login;
