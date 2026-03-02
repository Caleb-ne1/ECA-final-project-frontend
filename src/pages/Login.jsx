import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // get device info
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
  
    let device;
    if (/Mobi|Android/i.test(userAgent)) {
      device = "Mobile";
    } else {
      device = "Desktop";
    }
  
    return { userAgent, device };
  };


  // get ip address
  const getIpAddress = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error getting IP address:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { userAgent, device } = getDeviceInfo();
    const ipAddress = await getIpAddress();
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        { username, password, userAgent, device, ipAddress },
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
        navigate("/my");
      } else {
        setError("Unknown role. Please contact support.");
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        window.location.href = "/registration_pending"
      } else {
        setError("Invalid Login. Please try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full ml-2 bg-transparent outline-none"
              required
            />

            <p
              onClick={() => setShowPassword(!showPassword)}
              className="bg-white focus:outline-none hover:cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </p>
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
