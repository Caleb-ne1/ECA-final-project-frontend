import React, { useState } from "react";
import axios from "axios";

const Email = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    //check if email is empty
    if (email === "") {
      setError("Email field is required*");
      return; 
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/forgot-password`,
        {
          email: email,
        }
      );

      if (response.status === 200) {
        setEmail("");
        setError("");
        window.location.href = `/verify_otp?email=${encodeURIComponent(email)}`;
        setEmail(response.data.email);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Enter your email
        </h1>
        <p className="text-center text-gray-600 mb-6">
          To reset your password, please provide your email
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleEmailSubmit}
              className="text-white focus:outline-none btn_send"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;