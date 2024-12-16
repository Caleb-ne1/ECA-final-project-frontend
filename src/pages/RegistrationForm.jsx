import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    FirstName: "",
    LastName: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setpasswordError("Passwords do not match. Please try again.");
      return;
    }

    const { password, username, email, FirstName, LastName, phone } = formData;

    const registrationData = {
      username,
      email,
      password,
      FirstName,
      LastName,
      phone,
      token,
    };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/user/validate-and-register`,
      registrationData
    );
    console.log(response)
    if(response.status === 201) {
      window.location.href = "/";
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        FirstName: "",
        LastName: "",
        phone: "",
      });
    }
  } catch(err) {
    if (err.response) {
      if (err.response.status === 400) {
        setEmailError(err.response.data.emailError || "");
        setUsernameError(err.response.data.errorUsername || "");
      } else {
        setError(err.response.data.error || "Failed to add user");
      }
    } else {
      setError("Network error or server not responding.");
    }
  }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img
        src="https://elearning.zetech.ac.ke/pluginfile.php/1/theme_edutor/logo/1731999445/Logo_without_Tag_B_Scaled.png"
        alt=""
        className="h-28 pt-5"
      />
      <div className="w-full max-w-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          User Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your username"
              required
            />
            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your email"
              required
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your password"
              required
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="FirstName"
              id="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="LastName"
              id="LastName"
              value={formData.LastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full  bg-blue-950 text-white px-4 py-2 rounded-md hover: bg-blue-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;