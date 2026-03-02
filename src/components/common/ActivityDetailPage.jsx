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
import QrCodeCard from "./QrCodeCard";
import { useNavigate } from "react-router-dom";
import AttendancePage from "./AttendancePage";
import QrCodeScanner from "./QrCodeScanner";
import ParticipantsList from "../coordinator/ParticipantsList";
import LoadingScreen from "../../pages/LoadingScreen";
import { Bounce, toast as toast2, ToastContainer } from "react-toastify";
import ScanAttendance from "./ScanAttendance";
import { Mail, Phone } from "lucide-react";

const ActivityDetailPage = () => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [activity, setActivity] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
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

  useEffect(() => {
    fetchActivity();
  }, []);

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

  // edit activity
  const editActivity = async (id) => {
    window.location.href = `/activity/edit?id=${encodeURIComponent(id)}`;
  };

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
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/user/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data && response.data.user && response.data.user.role) {
          setRole(response.data.user.role);
          setUserId(response.data.user.id);
          setUserEmail(response.data.user.email);
        } else {
          console.error("Role not found in user data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setRole(null);
      });
  }, []);

  // register
  const registerUserForActivity = async (activityId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/activity/register`,
        { activityId },
        { withCredentials: true }
      );

      toast2.success("Registration successful");

      window.location.reload();
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // registration status
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/activity/attendance/check/${id}`,
          { withCredentials: true }
        );
        setIsRegistered(response.data.registered);
      } catch (error) {
        console.error("Error fetching registration status:", error);
      }
    };

    if (id) {
      checkRegistration();
    }
  }, [id]);

  // deregister a user
  const deregisterUser = async (activityId, refreshData) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/activity/attendance/deregister/${activityId}`,
        {
          withCredentials: true,
        }
      );
  
      window.location.reload();
      
      if (response.data.status === 200) {
        setIsRegistered(false); 
      }
    } catch (error) {
      console.error("Error deregistering user:", error.response?.data || error.message);
    }
  };
  

  if (!activity) {
    return <p className="text-center text-gray-500">No activity selected.</p>;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen p-6 mt-16 bg-gray-50">
      {/* Tabs */}
      <div className="flex justify-center px-2 pb-2 overflow-x-auto">
        <div className="flex w-full space-x-4 sm:space-x-6 whitespace-nowrap">
          {[
            "details",
            "attendance",
            ...(["admin"].includes(role) ||
            activity.UserId === userId ||
            activity.facilitator.some((fac) => fac.email === userEmail)
              ? ["Participants List"]
              : []),
            ...(activity.attendance_marking_qrcode === "qrcode"
              ? ["qrcode"]
              : []),
            ...(["admin"].includes(role) ||
            activity.UserId === userId ||
            activity.facilitator.some((fac) => fac.email === userEmail)
              ? ["QrCode Scanner"]
              : []),
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium px-4 py-2 rounded-t-lg transition-all duration-300
          ${
            activeTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "details" && (
        <div className="max-w-4xl mx-auto overflow-hidden bg-white">
          {/* image section */}
          <div className="relative">
            <img
              src={activity.image_link}
              alt={activity.activity_name}
              className="object-cover w-full h-64"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <h1 className="text-3xl font-bold text-center text-white">
                {activity.activity_name}
              </h1>
            </div>
          </div>

          {/* details section */}
          <div className="p-6">
            <div className="p-4 bg-white border-l-4 border-blue-500">
              {/* Date & Time */}
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Date/Time:</span>{" "}
                {formattedDateTime(activity.start)} -{" "}
                {formattedDateTime(activity.stop)}
              </p>

              {/* Registration Deadline */}
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Registration deadline:</span>{" "}
                {new Date(activity.registration_deadline) < new Date() ? (
                  <span className="font-semibold text-red-600">
                    Registration Closed
                  </span>
                ) : (
                  formattedDateTime(activity.registration_deadline)
                )}
              </p>

              {/* Activity Type */}
              {activity.activity_type && (
                <div className="flex items-center gap-3 p-3 mt-3 bg-gray-100 rounded-lg">
                  <div className="w-5 h-5 text-blue-600 bg-blue-100 rounded-full" />
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-800">
                      Activity Type:
                    </span>{" "}
                    {activity.activity_type}
                  </p>
                </div>
              )}

              {/* Author */}
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Author:</span>{" "}
                {activity.User.FirstName} {activity.User.LastName}
              </p>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: activity.activity_description,
              }}
              className="mt-6"
            />

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

            {activity.facilitator && activity.facilitator.length > 0 && (
              <div className="mt-4 bg-white">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">
                  Facilitator(s)
                </h2>
                <div className="space-y-4">
                  {activity.facilitator.map((fac, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white border rounded-lg shadow-sm"
                    >
                      {/* Email Section */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Mail className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Email:</p>
                          <p className="text-gray-600">{fac.email}</p>
                        </div>
                      </div>

                      {/* Contact Section */}
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Phone className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Contact:</p>
                          <p className="text-gray-600">{fac.contact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                            <div className="flex items-center p-4">
                              <img
                                src="https://img.freepik.com/free-photo/user-profile-icon-front-side_187299-39596.jpg?uid=R108859324&ga=GA1.1.2084167895.1739460905&semt=ais_hybrid"
                                alt={organizer.name}
                                className="w-20 h-20 border-2 border-gray-300 rounded-full shadow-sm"
                              />
                              <div className="ml-4">
                                {organizer.name && (
                                  <h4 className="text-lg font-semibold text-gray-800">
                                    {organizer.name}
                                  </h4>
                                )}

                                {/* Organizer Type with Tag Style */}
                                {organizer.type && (
                                  <span className="inline-block px-3 py-1 mt-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                                    {organizer.type.replace(/_/g, " ")}
                                  </span>
                                )}

                                {organizer.title && (
                                  <p className="mt-1 text-sm text-gray-600">
                                    {organizer.title}
                                  </p>
                                )}

                                {organizer.bio && (
                                  <p className="mt-2 text-sm leading-tight text-gray-600">
                                    {organizer.bio}
                                  </p>
                                )}

                                {organizer.website && (
                                  <div className="mt-2">
                                    <a
                                      href={organizer.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-medium text-blue-500 hover:underline"
                                    >
                                      Visit {organizer.name} Website
                                    </a>
                                  </div>
                                )}

                                {organizer.contact && (
                                  <p className="mt-1 text-sm text-gray-500">
                                    📞 {organizer.contact}
                                  </p>
                                )}
                              </div>
                            </div>
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

            {(activity.eligibility || activity.max_participants > 0) && (
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
                  {activity.max_participants > 0 && (
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
                </div>
              </div>
            )}

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
              {isRegistered ? (
                <button
                  className="px-6 py-2 text-white transition duration-200 rounded-lg shadow bg-blue-950 hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => deregisterUser(activity.id, fetchActivity)}
                  disabled={new Date(activity.start) < new Date()}
                >
                  Deregister
                </button>
              ) : (
                <button
                  className="px-6 py-2 text-white transition duration-200 rounded-lg shadow bg-blue-950 hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={() => registerUserForActivity(activity.id)}
                  disabled={
                    new Date(activity.registration_deadline) < new Date()
                  }
                >
                  Register
                </button>
              )}
              {role === "admin" || activity.UserId === userId ? (
                <div className="flex items-center gap-4 text-gray-600">
                  <MdEdit
                    className="w-6 h-6 transition cursor-pointer hover:text-blue-600"
                    onClick={() => editActivity(activity.id)}
                  />
                  <MdDelete
                    className="w-6 h-6 transition cursor-pointer hover:text-red-600"
                    onClick={() => deleteActivity(activity.id)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

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

      {activeTab === "attendance" && (
        <AttendancePage activity_id={activity.id} />
      )}
      {activeTab === "Participants List" && (
        <ParticipantsList
          startDate={activity.start}
          endDate={activity.stop}
          activity_id={activity.id}
          activity_name={activity.activity_name}
        />
      )}
      {activeTab === "qrcode" && (
        <QrCodeCard
          name="Caleb Kibet"
          activityName={activity.activity_name}
          qrValue={activity.name}
          activity_Id={activity.id}
        />
      )}

      {activeTab == "QrCode Scanner" && (
        <ScanAttendance
          startDate={activity.start}
          endDate={activity.stop}
          activity_id={activity.id}
        />
      )}
    </div>
  );
};

export default ActivityDetailPage;
