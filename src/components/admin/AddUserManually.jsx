import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUserManually() {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    username: "",
    role: "",
    email: "",
    phone: "",
  });

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [error, setError] = useState("");

  // Function to clear fields
  const ClearFields = () => {
    setUser({
      FirstName: "",
      LastName: "",
      username: "",
      role: "",
      email: "",
      phone: "",
    });
    setError("");
    setEmailError("");
    setUsernameError("");
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (Object.values(user).some((value) => value.trim() === "")) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/admin/add-user`,
        user
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        ClearFields();
        setEmailError("");
        setUsernameError("");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setEmailError(err.response.data.emailError || "");
          setUsernameError(err.response.data.usernameError || "");
        } else {
          toast.error(err.response.data.error || "Failed to add user");
        }
      } else {
        setError("Network error or server not responding.");
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="pt-16">
      <div className="max-w-2xl p-6 mx-auto rounded-md">
        <h1 className="mb-4 text-2xl font-semibold text-gray-700">
          Add New User
        </h1>
        <form onSubmit={handleFormSubmit}>
          {/* First and Last Name */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="FirstName"
                value={user.FirstName}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="LastName"
                value={user.LastName}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Username and Role */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="username"
                value={user.username}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {usernameError && <p className="text-red-500">{usernameError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Role
              </label>
              <select
                onChange={handleInputChange}
                name="role"
                value={user.role}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">-- select --</option>
                <option value="student">Student</option>
                <option value="coordinator">Coordinator</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                value={user.email}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                onChange={handleInputChange}
                type="tel"
                name="phone"
                value={user.phone}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={ClearFields}
              type="button"
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-400"
            >
              Clear
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
}

export default AddUserManually;


