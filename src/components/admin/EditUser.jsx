import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

const EditUser = () => {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    username: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // get id from url
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // fetch user data by id
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/me/${id}`
      );
      if (response.status === 200) {
        const data = response.data.user;
        setUser({
          FirstName: data.FirstName,
          LastName: data.LastName,
          email: data.email,
          phone: data.phone,
          username: data.username,
          role: data.role,
        });
      }
    } catch (err) {
      setError("Failed to fetch user data. Please try again later.");
    }
  };

  // Update user data by id
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/api/user/admin/edit/${id}`,
        user
      );
      if (response.status === 200) {
        setSuccessMessage("User updated successfully!");
        setError("");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Failed to update user");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div className="pt-16">
      <div className="max-w-2xl p-6 mx-auto rounded-md">
        <button className="flex items-center mb-2 px-2 py-2 text-sm font-medium text-blue-600 rounded-lg shadow focus:outline-none" onClick={() => window.location.href = "/manage_users"}>
          <IoIosArrowRoundBack className="mr-2 text-lg" />
          Back
        </button>
        <h1 className="mb-4 text-2xl font-semibold text-gray-700">Edit User</h1>
        <form onSubmit={handleEditUser}>
          {/* First and Last Name */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-600"
              >
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
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-600"
              >
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
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="username"
                value={user.username}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-600"
              >
                Role
              </label>
              <select
                onChange={handleInputChange}
                name="role"
                value={user.role}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="student">Student</option>
                <option value="coordinator">Coordinator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                value={user.email}
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <p className="success_message">{successMessage}</p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/manage_users")} 
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;