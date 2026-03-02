import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
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
    token: token
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

    const { password, username, email, FirstName, LastName, phone, token } = formData;

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
        toast.error(err.response.data.token_error || "")
        setEmailError(err.response.data.email_error || "");
        setUsernameError(err.response.data.username_error || "");
      } else {
        setError(err.response.data.error || "Failed to add user");
      }
    } else {
      setError("Network error or server not responding.");
    }
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="w-full py-16 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/purple-pink-halftone-background-vector_53876-67278.jpg?ga=GA1.1.1851588526.1737533239&semt=ais_hybrid')",
        }}
      >
        <div className="text-center text-white">
          <h1 className="mb-4 text-4xl font-bold">
            Extracurricular Activities Registration System
          </h1>{" "}
          <h2 className="mb-2 text-3xl font-semibold">Register Your Account</h2>{" "}
          <p className="text-lg">
            Fill in the details below to create your account and get started.
          </p>{" "}
        </div>
      </div>
      <div className="w-full max-w-lg p-8 rounded-lg">
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-blue-950"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default RegistrationForm