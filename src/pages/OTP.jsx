import React, { useState } from "react";
import axios from "axios";

const OTP = () => {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Get query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const phone = queryParams.get("phone");

  // Use whichever identifier is present
  const identifier = email || phone || "";

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value.length === 1 && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/verify-otp`,
        {
          identifier,
          otp: enteredOtp,
        }
      );

      if (response.status === 200) {
        window.location.href = `/set_new_password?identifier=${encodeURIComponent(
          identifier
        )}&otp=${encodeURIComponent(enteredOtp)}`;
      } else if (response.status === 400) {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 otp_verification_container bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white">
        <h1 className="mb-4 text-2xl font-bold text-center">Enter OTP</h1>
        <p className="mb-4 text-sm text-center text-gray-700">
          We have sent a verification code to{" "}
          <strong>{email ? email : phone}</strong>
        </p>
        {error && (
          <p className="mb-4 text-sm text-center text-red-500">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                className="w-10 h-10 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-12 sm:h-12"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white rounded-lg bg-blue-950 sm:text-base hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;

