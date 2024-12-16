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

      if(response.status === 200) {
        window.location.href = `/set_new_password?email=${encodeURIComponent(
          email
        )}&otp=${encodeURIComponent(enteredOtp)}`;

      } else if(response.status ===  400) {
        setError(response.data.message)
      }
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className="otp_verification_container h-full w-full flex items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-4">Enter OTP</h1>
      <p className="text-center text-gray-700 mb-6">
        We have sent a verification code to {email}
      </p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-x-4 justify-center"
      >
        <div className="flex flex-row space-x-4 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="number"
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              required
            />
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg_btn_color text-white rounded-lg focus:outline-none"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTP;