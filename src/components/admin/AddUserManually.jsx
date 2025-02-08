import React, { useState } from 'react'
import axios from "axios";

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
  const [successMessage, setSuccessMessage] = useState("");


  //handle add new user form submit
 const handleFormSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await axios.post(
       `${import.meta.env.VITE_APP_API_URL}/api/user/admin/add-user`,
       user
     );

     // Handle successful response
     if (response.status === 201) {
       setSuccessMessage(response.data.message); 
       setEmailError(""); 
       setUsernameError("");
       ClearFields();
     }
   } catch (err) {
     if (err.response) {
       if (err.response.status === 400) {
         setEmailError(err.response.data.emailError || ""); 
         setUsernameError(err.response.data.usernameError || ""); 
       } else {
         setError(err.response.data.error || "Failed to add user");
       }
     } else {
       setError("Network error or server not responding.");
     }
   }
 };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  //clear fields
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
  }

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
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
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
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
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
                className="block w-full p-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <p className="success_message">{successMessage}</p>
          )}
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
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserManually