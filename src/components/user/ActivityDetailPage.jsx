import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaVideo, FaCheckCircle } from "react-icons/fa";
import { FaUserFriends, FaClipboardCheck, FaListUl } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import { FiFile } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ActivityDetailPage = () => {
  const [role, setRole] = useState("");
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  // get id from url
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  // convert date and time
  const formattedDateTime = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString();

    return formattedDate;
  };

  useEffect(() => {
    // Fetch activity data from the API
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/activities/${id}`
        );
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  console.log(activity);

  const renderFileIcon = (file) => {
    if (!file || !file.name) {
      return <FiFile className="w-6 h-6 text-gray-500" />;
    }

    const extension = file.name.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return <FaFilePdf className="w-6 h-6 text-red-500" />;
      case "docx":
      case "doc":
        return <BsFiletypeDocx className="w-6 h-6 text-blue-500" />;
      default:
        return <FiFile className="w-6 h-6 text-gray-500" />;
    }
  };

  const navigate = useNavigate();
  // delete activity
  const deleteActivity = async (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this activity? This action cannot be undone.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5C7285",
      confirmButtonText: "delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_APP_API_URL}/api/activity/${id}`
          );

          Swal.fire("Deleted!", "Activity has been deleted.", "success");
          navigate(-1);
        } catch (error) {
          Swal.fire("Error!", "Failed to delete activity.", "error");
          console.error("Error deleting activity:", error);
        }
      }
    });
  };

   // Fetch user role
   useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/api/user/auth/me`, {
      withCredentials: true,  
    })
    .then((response) => {
      if (response.data && response.data.user && response.data.user.role) {
        setRole(response.data.user.role); 
      } else {
        console.error("Role not found in user data.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      setRole(null); 
    })
  }, []);

  if (!activity) {
    return <p className="text-center text-gray-500">No activity selected.</p>;
  }

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white">
        {/* image section */}
        <div className="relative">
          <img
            src={activity.image_link}
            alt={activity.activity_name}
            className="object-cover w-full h-64"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-3xl font-bold text-white">
              {activity.activity_name}
            </h1>
          </div>
        </div>

        {/* details section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activity.name}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-medium">Date/Time:</span>{" "}
            {formattedDateTime(activity.start)} -{" "}
            {formattedDateTime(activity.stop)}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-medium">Registered deadline:</span>{" "}
            {formattedDateTime(activity.registration_deadline)}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            <span className="font-medium">Activity type:</span> {activity.type}
          </p>

          <p className="mt-4 text-gray-700">{activity.activity_description}</p>

          {/* Online/Offline Mode */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Mode</h3>
            {activity.mode == "online" ? (
              <div className="flex items-center mt-2 text-blue-600">
                <FaVideo className="w-5 h-5 mr-2" />
                <span>
                  Virtual Event - Join via{" "}
                  <a
                    href={activity.virtual_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Link
                  </a>
                </span>
              </div>
            ) : (
              <div className="flex items-center mt-2 text-green-600">
                <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                <span>In-Person Event at {activity.venue}</span>
              </div>
            )}
          </div>

          {/* organizers section */}
          <div className="mt-6">
            {activity.organizers &&
              activity.organizers.filter((organizer) =>
                Object.values(organizer).some((value) => value !== "")
              ).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Organizers
                  </h3>
                  <div className="p-3 mt-2 bg-gray-100 rounded-lg shadow-sm">
                    {activity.organizers
                      .filter((organizer) =>
                        Object.values(organizer).some((value) => value !== "")
                      )
                      .map((organizer, index) => (
                        <div key={index} className="flex items-center mb-4">
                          {organizer.type === "" && (
                            <div className="flex items-center">
                              <img
                                src={
                                  organizer.photo ||
                                  "https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?uid=R108859324&ga=GA1.1.2084167895.1739460905&semt=ais_hybrid"
                                } 
                                alt={organizer.name}
                                className="w-16 h-16 mr-4 rounded-full"
                              />
                              <div>
                                {organizer.name && (
                                  <h4 className="font-semibold text-gray-700">
                                    {organizer.name}
                                  </h4>
                                )}
                                {organizer.title && (
                                  <p className="text-sm text-gray-600">
                                    {organizer.title}
                                  </p>
                                )}
                                {organizer.bio && (
                                  <p className="mt-2 text-sm text-gray-600">
                                    {organizer.bio}
                                  </p>
                                )}
                                {organizer.contact && (
                                  <p className="text-sm text-gray-600">
                                    Contact: {organizer.contact}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {(organizer.type === "university" ||
                            organizer.type === "organizers" || organizer.type === "person") && (
                            <div className="flex items-center">
                              <img
                                src="https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?uid=R108859324&ga=GA1.1.2084167895.1739460905&semt=ais_hybrid"
                                alt={organizer.name}
                                className="w-16 h-16 mr-4 rounded-full"
                              />
                              <div>
                                {organizer.name && (
                                  <h4 className="font-semibold text-gray-700">
                                    {organizer.name}
                                  </h4>
                                )}
                                {organizer.title && (
                                  <p className="text-sm text-gray-600">
                                    {organizer.title}
                                  </p>
                                )}
                                {organizer.bio && (
                                  <p className="mt-2 text-sm text-gray-600">
                                    {organizer.bio}
                                  </p>
                                )}
                                {organizer.website && (
                                  <div className="mt-2">
                                    <a
                                      href={organizer.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      Visit {organizer.name} Website
                                    </a>
                                  </div>
                                )}
                                {organizer.contact && (
                                  <p className="text-sm text-gray-600">
                                    Contact: {organizer.contact}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </div>

          {/* required materials section */}
          {activity.required_materials &&
            activity.required_materials.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Required Materials
                </h3>
                <ul className="mt-2 space-y-2">
                  {activity.required_materials.map((material, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 transition bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200"
                    >
                      <FaCheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      <span className="text-gray-700">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* participant criteria section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Participant Criteria
            </h3>
            <div className="mt-4 space-y-4">
              {/* eligibility */}
              {activity.eligibility && (
                <div className="flex items-start">
                  <FaClipboardCheck className="w-5 h-5 mt-1 mr-3 text-blue-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Eligibility
                    </h4>
                    <p className="text-sm text-gray-600">
                      {activity.eligibility}
                    </p>
                  </div>
                </div>
              )}

              {/* max participants */}
              {activity.max_participants && (
                <div className="flex items-start">
                  <FaUserFriends className="w-5 h-5 mt-1 mr-3 text-green-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Maximum Participants
                    </h4>
                    <p className="text-sm text-gray-600">
                      {activity.max_participants}
                    </p>
                  </div>
                </div>
              )}

              {/* special requirements */}
              {/* {activity.special_requirements && (
                <div className="flex items-start">
                  <FaClipboardCheck className="w-5 h-5 mt-1 mr-3 text-red-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Special Requirements
                    </h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {activity.special_requirements.map(
                        (requirement, index) => (
                          <li key={index}>{requirement}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}   */}
            </div>
          </div>

          {/* files section */}
          {activity.files && activity.files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Files</h3>
              <ul className="mt-2 space-y-2">
                {activity.files.map((file) => (
                  <li className="flex items-center justify-between p-3 transition bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200">
                    <div className="flex items-center">
                      {renderFileIcon(file.fileName)}
                      <span className="ml-3 text-gray-700">
                        {file.fileName}
                      </span>
                    </div>
                    <a
                      href={file.fileUrl}
                      download
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            <button className="px-6 py-2 text-white transition duration-200 rounded-lg shadow bg-blue-950 hover:bg-blue-900">
              Register Now
            </button>
            
            {role === "admin" || role === "staff" || role === "coordinator" ? (
            <div className="flex items-center gap-4 text-gray-600">
              <MdEdit className="w-6 h-6 transition cursor-pointer hover:text-blue-600" />
              <MdDelete
                className="w-6 h-6 transition cursor-pointer hover:text-red-600"
                onClick={() => deleteActivity(activity.id)}
              />
              {role}
            </div>
            ) : null }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
