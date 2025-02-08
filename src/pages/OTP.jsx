import React, { useState } from "react";
import axios from "axios";

const OTP = () => {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");

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
          email: email,
          otp: enteredOtp,
        }
      );

      if (response.status === 200) {
        window.location.href = `/set_new_password?email=${encodeURIComponent(
          email
        )}&otp=${encodeURIComponent(enteredOtp)}`;
      } else if (response.status === 400) {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="otp_verification_container min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Enter OTP</h1>
        <p className="text-center text-gray-700 mb-4 text-sm">
          We have sent a verification code to <strong>{email}</strong>
        </p>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex space-x-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="number"
                className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-12 sm:h-12"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-950 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
