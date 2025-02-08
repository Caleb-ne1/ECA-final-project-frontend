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
    <div className="login-container bg-white">
      <div className="left_container">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>
        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="group">
            <FaUser />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log in</button>
        </form>
        <a
          href="/enter_your_email"
          className="text-blue-500 hover:text-blue-700 text-sm font-medium underline pt-4"
        >
          Forgot password?
        </a>
      </div>
      <div className="right_container"></div>
    </div>
  );
};

export default Login;
