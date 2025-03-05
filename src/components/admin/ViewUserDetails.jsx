import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import LoadingScreen from "../../pages/LoadingScreen";

function ViewUserDetails() {
  const [user, setUser] = useState(null);

  // Get id from URL
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  // Fetch user details by id
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/me/${id}`
      );
      if (response.status === 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!user) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 mt-16">
      <div className="w-full max-w-3xl overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 text-white bg-purple-700">
          <div>
            <h4 className="text-xl font-semibold">User Details</h4>
            <p className="text-sm text-gray-200">{user.role}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaUser className="text-4xl" />
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DetailItem label="First Name" value={user.FirstName} />
            <DetailItem label="Last Name" value={user.LastName} />
            <DetailItem label="Email Address" value={user.email} />
            <DetailItem label="Phone" value={user.phone} />
            <DetailItem label="Username" value={user.username} />
          </div>
        </div>

        {/* Academic Information */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Academic Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DetailItem label="Institution ID" value={user.institution_id} />
            <DetailItem label="Program of Study" value={user.program_of_study} />
            <DetailItem label="Year of Study" value={user.year_of_study} />
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <a
            href={`/edit?id=${user.id}`}
            className="px-4 py-2 text-white transition duration-300 rounded-lg bg-blue-950 hover:bg-blue-900"
          >
            Edit User
          </a>
        </div>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-lg text-gray-800">{value || "N/A"}</p>
  </div>
);

export default ViewUserDetails;
