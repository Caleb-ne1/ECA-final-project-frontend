import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { FaUser, FaEye, FaEyeSlash, FaUniversity, FaGraduationCap, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
const Profile = () => {
  const [isEditting, setisEditting] = useState(false);
  const [isEdittingAcInfo, setisEdittingAcInfo] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isvisible, setisVisible] = useState(false);
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    username: "",
    role: "",
    institution_id: "",
    program_of_study: "",
    year_of_study: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // toggle password visibility field
  const toggleVisibility = (field) => {
    if (field === "old") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // function to fetch user details
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/me`,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setUser({
        FirstName: data.user.FirstName,
        LastName: data.user.LastName,
        email: data.user.email,
        phone: data.user.phone,
        username: data.user.username,
        role: data.user.role,
        institution_id: data.user.institution_id,
        program_of_study: data.user.program_of_study,
        year_of_study: data.user.program_of_study,
      });
    } catch (error) {
      if (!error.response) {
        console.error(
          "Unable to connect to the server. Please try again later."
        );
      } else {
        console.error("An error occurred while fetching data.");
      }
    }
  };

  console.log(user);
  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const EditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/api/user/me/update`,
        user,
        {
          withCredentials: true,
        }
      );
      setisEditting(false);
      setisEdittingAcInfo(false);
    } catch (error) {
      console.error("Error updating the user ", error);
    }
  };

  //change password
  const ChangePassword = async (e) => {
    e.preventDefault();

    // check if passwords are provided
    if (password1 === "" || password2 === "") {
      setError("Password fields must not be empty");
      setSuccess("");
    } else if (password1.length < 8 || password2.length < 8) {
      setError("Password must be at least 8 characters long");
      setSuccess("");
    } else if (password1 === password2) {
      setNewPassword(password2);

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/user/change-password`,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setError("");
          toast.success("Password changed successfully!");
          setPassword1("");
          setPassword2("");
          setOldPassword("");
          setNewPassword("");
        }
      } catch (error) {
        console.error("An error occurred", error);
        setError(error.response.data.message);
        setSuccess("");
      }
    } else {
      setError("Passwords do not match");
      setSuccess("");
    }
  };

  // fetch first and login
  const [firstLogin, setFirstLogin] = useState(null);
  const [lastLogin, setLastLogin] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/user/get-first-last-login`,
          { withCredentials: true }
        );

        setFirstLogin(response.data.firstLogin);
        setLastLogin(response.data.lastLogin);
      } catch (err) {
        console.error("Error fetching login history:", err);
        setErrorLogin("Failed to fetch login history");
      }
    };

    fetchLoginHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white shadow-md overflow-hidden mb-8">
          <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-indigo-100 p-4 rounded-full">
              <FaUser className="text-indigo-600 text-4xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mt-1">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
              {!isEditting ? (
                <button 
                  onClick={() => setisEditting(true)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <CiEdit className="text-lg" />
                  <span>Edit</span>
                </button>
              ) : null}
            </div>
            
            <form onSubmit={EditFormSubmit} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    {!isEditting ? (
                      <p className="text-gray-600 bg-gray-50 p-2 rounded">{user.FirstName || "N/A"}</p>
                    ) : (
                      <input
                        type="text"
                        name="FirstName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={user.FirstName}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    {!isEditting ? (
                      <p className="text-gray-600 bg-gray-50 p-2 rounded">{user.LastName || "N/A"}</p>
                    ) : (
                      <input
                        type="text"
                        name="LastName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={user.LastName}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {!isEditting ? (
                    <p className="text-gray-600 bg-gray-50 p-2 rounded">{user.email || "N/A"}</p>
                  ) : (
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {!isEditting ? (
                    <p className="text-gray-600 bg-gray-50 p-2 rounded">{user.phone || "N/A"}</p>
                  ) : (
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={user.phone}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              </div>

              {isEditting && (
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setisEditting(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Academic Information */}
          <div className="bg-white shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Academic Information</h2>
              {!isEdittingAcInfo ? (
                <button 
                  onClick={() => setisEdittingAcInfo(true)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <CiEdit className="text-lg" />
                  <span>Edit</span>
                </button>
              ) : null}
            </div>
            
            <form onSubmit={EditFormSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FaUniversity className="text-indigo-500" />
                    Institution ID
                  </label>
                  {!isEdittingAcInfo ? (
                    <p className="text-gray-600 bg-gray-50 p-2 rounded">{user.institution_id || "N/A"}</p>
                  ) : (
                    <input
                      type="text"
                      name="institution_id"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={user.institution_id}
                      onChange={handleInputChange}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FaGraduationCap className="text-indigo-500" />
                    Program of Study
                  </label>
                  {!isEdittingAcInfo ? (
                    <p className="text-gray-600 bg-gray-50 p-2 rounded">{user.program_of_study || "N/A"}</p>
                  ) : (
                    <input
                      type="text"
                      name="program_of_study"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={user.program_of_study}
                      onChange={handleInputChange}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FaCalendarAlt className="text-indigo-500" />
                    Year of Study
                  </label>
                  {!isEdittingAcInfo ? (
                    <p className="text-gray-600 bg-gray-50 p-2 rounded">{user.year_of_study || "N/A"}</p>
                  ) : (
                    <input
                      type="text"
                      name="year_of_study"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={user.year_of_study}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              </div>

              {isEdittingAcInfo && (
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setisEdittingAcInfo(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white shadow-md overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">Change Password</h3>
              <button 
                onClick={() => setisVisible(!isvisible)}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <CiEdit className="text-lg" />
                <span>{isvisible ? 'Hide' : 'Change'}</span>
              </button>
            </div>

            {isvisible && (
              <form onSubmit={ChangePassword} className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility("old")}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="password1"
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    onChange={(e) => setPassword1(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility("new")}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password2"
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility("confirm")}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setisVisible(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Login Activity */}
        <div className="bg-white shadow-md overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Login Activity</h2>
          </div>
          
          <div className="p-6">
            {errorLogin ? (
              <p className="text-red-500">{errorLogin}</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaCalendarAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">First Access</p>
                    <p className="font-medium text-gray-800">
                      {firstLogin ? new Date(firstLogin).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaCalendarAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Access</p>
                    <p className="font-medium text-gray-800">
                      {lastLogin ? new Date(lastLogin).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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

export default Profile;
