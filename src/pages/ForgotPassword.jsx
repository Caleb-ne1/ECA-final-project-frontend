import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!identifier) {
      setError(`${activeTab === "email" ? "Email" : "Phone"} field is required*`);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/forgot-password`,
        { identifier }
      );

      if (response.status === 200) {
        setError("");
        window.location.href = `/verify_otp?${activeTab}=${encodeURIComponent(identifier)}`;
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8">
        <h1 className="mb-4 text-3xl font-semibold text-center">Reset Your Password</h1>
        <p className="mb-6 text-center text-gray-600">
          Select a method to receive your OTP
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          {["email", "phone"].map((method) => (
            <button
              key={method}
              className={`px-4 py-2 text-lg font-medium ${
                activeTab === method ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab(method);
                setIdentifier(""); // Reset input field when switching tabs
                setError("");
              }}
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-700">
            {activeTab === "email" ? "Email" : "Phone"}
          </label>
          <input
            type={activeTab === "email" ? "email" : "tel"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter your ${activeTab}`}
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
