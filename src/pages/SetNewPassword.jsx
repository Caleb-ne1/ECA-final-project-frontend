import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const phone = queryParams.get("phone");
  
  const identifier = email || phone || "";
  const otp = queryParams.get("otp");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      setError("Both fields are required*");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setSuccess("");
      return;
    }

    axios
      .patch(`${import.meta.env.VITE_APP_API_URL}/api/user/set-new-password`, {
        identifier: identifier,
        otp: otp,
        newPassword: confirmPassword,
      })
      .then((response) => {
        setSuccess(response.data.message);
        window.location.href = "/";
        console.log(response);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-lg">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Set New Password
        </h1>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm your new password"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-md bg_btn_color focus:outline-none focus:ring-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;