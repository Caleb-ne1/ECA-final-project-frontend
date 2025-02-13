import React, { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeDocx } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { RiDraftFill } from "react-icons/ri";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
const CreateActivity = () => {
  const [sections, setSections] = useState({
    isExpanded: false,
    isParticipantExpanded: false,
    isScheduleExpanded: false,
    isAttendanceExpanded: false,
    isFacilitatorExpanded: false,
    isLocationExpanded: false,
    isResourcesExpanded: false,
    isNotificationExpanded: false,
    isOrganizersExpanded: false,
  });

  const toggleVisibility = (section) => {
    setSections((prevSections) => ({
      ...Object.keys(prevSections).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      ),
      [section]: !prevSections[section],
    }));
  };

  const [organizers, setOrganizers] = useState([
    {
      name: "",
      type: "",
      contact: "",
      bio: "",
      photo: "",
      website: "",
    },
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  // handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // remove a file from the list
  const removeFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  // get file icon based on the file type
  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (fileExtension === "pdf") {
      return (
        <FaFilePdf className="w-6 h-6 text-red-500 transition duration-200 hover:text-red-700" />
      );
    }

    if (fileExtension === "docx" || fileExtension === "doc") {
      return (
        <BsFiletypeDocx className="w-6 h-6 text-blue-500 transition duration-200 hover:text-blue-700" />
      );
    }

    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "svg"
    ) {
      return (
        <FaFileImage className="w-6 h-6 text-blue-500 transition duration-200 hover:text-blue-700" />
      );
    }

    // default file icon for other types
    return (
      <FaFile className="w-6 h-6 text-gray-900 transition duration-200 hover:text-gray-800" />
    );
  };

  const handleOrganizerChange = (index, field, value) => {
    const updatedOrganizers = [...organizers];
    updatedOrganizers[index][field] = value;
    setOrganizers(updatedOrganizers);
  };

  //facilitator

  const [facilitatorData, setFacilitatorData] = useState({
    email: "",
    contact: "",
  });

  const [facilitatorsList, setFacilitatorsList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacilitatorData({ ...facilitatorData, [name]: value });
  };

  const addFacilitator = () => {
    if (facilitatorData.email && facilitatorData.contact) {
      setFacilitatorsList([...facilitatorsList, facilitatorData]);
      setFacilitatorData({ email: "", contact: "" });
    }
  };

  const removeFacilitator = (index) => {
    const updatedList = facilitatorsList.filter((_, i) => i !== index);
    setFacilitatorsList(updatedList);
  };

  // add a new organizer
  const handleAddOrganizer = () => {
    setOrganizers([
      ...organizers,
      {
        name: "",
        type: "",
        contact: "",
        bio: "",
        photo: "",
        website: "",
      },
    ]);
  };

  // remove an organizer
  const handleRemoveOrganizer = (index) => {
    setOrganizers(organizers.filter((_, i) => i !== index));
  };

  // special requirements
  const [specialRequirements, setSpecialRequirements] = useState([]);

  // add special requirement
  const addRequirements = () => {
    const newRequirement = document.getElementById("special_requirement").value;
    document.getElementById("special_requirement").value = "";

    if (newRequirement) {
      setSpecialRequirements((prev) => [...prev, newRequirement]);
    }
  };

  // remove special requirement
  const removeRequirement = (index) => {
    setSpecialRequirements((prev) => prev.filter((_, i) => i !== index));
  };

  //required materials
  const [materials, setMaterials] = useState([]);

  //add materials
  const addMaterial = () => {
    const newMaterial = document.getElementById("required_materials").value;

    document.getElementById("required_materials").value = "";

    if (newMaterial) {
      setMaterials((prev) => [...prev, newMaterial]);
    }
  };

  //remove material
  const removeMaterial = (index) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  };

  // states for registration deadline(date and time)
  const [timedeadline, settimedeadline] = useState("");
  const [datedeadline, setdatedeadline] = useState("");

  // states for avtivities date and time
  const [start_time, setstarttime] = useState("");
  const [start_date, setstartdate] = useState("");

  const [stop_time, setstoptime] = useState("");
  const [stop_date, setstopdate] = useState("");

  // to combine date and time
  const ISO_date_time = (date, time) => {
    if (date && time) {
      // combine date and time
      const dateTimeString = `${date}T${time}`;

      // Create date object
      const localDate = new Date(dateTimeString);

      // Convert to ISO string (UTC time)
      const isoDateTime = localDate.toISOString();

      return isoDateTime;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // states for activity
  const [imageLink, setImageLink] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityType, setActivityType] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [maxparticipants, setmaxparticipants] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [start, setstart] = useState("");
  const [stop, setstop] = useState("");
  const [specialrequirements, setspecialrequirements] = useState([]);
  const [venue, setvenue] = useState("");
  const [virtuallink, setvirtuallink] = useState("");
  const [mode, setmode] = useState("");
  const [attendancerequirement, setattendancerequirement] = useState("");
  const [attendanceMarkingManual, setAttendanceMarkingManual] = useState("");
  const [attendanceMarkingQrcode, setAttendanceMarkingQrcode] = useState("");
  const [activityReminders, setActivityReminders] = useState(true);
  const [activityAlerts, setActivityAlerts] = useState(true);
  const [facilitator, setFacilitator] = useState([]);
  const [requiredMaterials, setRequiredMaterials] = useState([]);
  const [files, setFiles] = useState([]);
  const [organizer, setOrganizer] = useState([]);

  console.log(selectedFiles);

  const createActivity = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form fields
    formData.append("image_link", imageLink);
    formData.append("activity_name", activityName);
    formData.append("activity_description", activityDescription);
    formData.append("eligibility", eligibility);
    formData.append("max_participants", maxparticipants);
    formData.append(
      "registration_deadline",
      ISO_date_time(datedeadline, timedeadline)
    );
    formData.append("start", ISO_date_time(start_date, start_time));
    formData.append("stop", ISO_date_time(stop_date, stop_time));
    formData.append("special_requirements", specialRequirements);
    formData.append("venue", venue);
    formData.append("virtual_link", virtuallink);
    formData.append("mode", mode);
    formData.append("attendance_requirement", attendancerequirement);
    formData.append("attendance_marking_manual", attendanceMarkingManual);
    formData.append("attendance_marking_qrcode", attendanceMarkingQrcode);
    formData.append("activity_reminders", activityReminders);
    formData.append("announcements_alerts", activityAlerts);
    formData.append("facilitator", JSON.stringify(facilitatorsList)); 
    formData.append("required_materials", JSON.stringify(materials));
    formData.append("organizers", JSON.stringify(organizers));

    // append files
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/activity`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Activity created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setSelectedFiles([]), setActivityName(""), setActivityDescription("")
    } catch (error) {
      if (error.response) {
        // access the error message from the response
        const errorMessage = error.response.data.message || "An unknown error occurred";
        toast.error(`Error: ${errorMessage}`);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="pt-16 pl-10 pr-10 create_activity_cont">
      <h1 className="p-4 mt-2 mb-2 bg-gray-50">Create activity</h1>
      <form className="flex flex-col gap-2">
        {/* general section */}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            General
          </p>

          {sections.isExpanded && (
            <div className="mt-4 space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Activity Image URL:
                </label>
                <input
                  type="text"
                  name="image_link"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              {/* activity name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Activity Name:
                </label>
                <input
                  type="text"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  name="activity_name"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* description */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="activity_description"
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  rows="4"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                ></textarea>
              </div>

              {/* activity type */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Activity Type:
                </label>
                <input
                  type="text"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  name="activity_type"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label htmlFor="registration_dateline">
                  Registration deadline:{" "}
                </label>
                <div className="flex flex-col">
                  <label
                    htmlFor="start_date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    name="deadline_date"
                    value={datedeadline}
                    onChange={(e) => setdatedeadline(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="deadline_time"
                    className="text-sm font-medium text-gray-700"
                  >
                    Time:
                  </label>
                  <input
                    type="time"
                    name="deadline_time"
                    value={timedeadline}
                    onChange={(e) => settimedeadline(e.target.value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* participant criteria section*/}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isParticipantExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isParticipantExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Participant Criteria
          </p>

          {sections.isParticipantExpanded && (
            <div className="mt-4 space-y-6">
              {/* activity name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Eligibility:
                </label>
                <input
                  type="text"
                  value={eligibility}
                  name="eligibility"
                  onChange={(e) => setEligibility(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder=""
                />
              </div>

              {/* description */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Max Participants:
                </label>
                <input
                  type="number"
                  name="max_participants"
                  value={maxparticipants}
                  onChange={(e) => setmaxparticipants(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* special requirements */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Special Requirements:
                </label>

                <div>
                  <ul>
                    {specialRequirements.map((specialRequirement, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        {specialRequirement}
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <input
                    type="text"
                    id="special_requirement"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addRequirements}
                    className="inline-block px-4 py-2 mt-2 text-white rounded-md bg-blue-950"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* schedule and duration section*/}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isScheduleExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isScheduleExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Schedule and Duration
          </p>

          {sections.isScheduleExpanded && (
            <div className="mt-4 space-y-6">
              {/* start Date/End date */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date/End Date:
                </label>

                <div className="p-4 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="start_date"
                          className="text-sm font-medium text-gray-700"
                        >
                          Start Date:
                        </label>
                        <input
                          type="date"
                          name="start_date"
                          value={start_date}
                          onChange={(e) => setstartdate(e.target.value)}
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="start_time"
                          className="text-sm font-medium text-gray-700"
                        >
                          Start Time:
                        </label>
                        <input
                          type="time"
                          name="start_time"
                          value={start_time}
                          onChange={(e) => setstarttime(e.target.value)}
                          id="start_time"
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="end_date"
                          className="text-sm font-medium text-gray-700"
                        >
                          End Date:
                        </label>
                        <input
                          type="date"
                          name="end_date"
                          value={stop_date}
                          onChange={(e) => setstopdate(e.target.value)}
                          id="end_date"
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="end_time"
                          className="text-sm font-medium text-gray-700"
                        >
                          End Time:
                        </label>
                        <input
                          type="time"
                          name="end_time"
                          value={stop_time}
                          onChange={(e) => setstoptime(e.target.value)}
                          id="end_time"
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* attendance frequency */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Attendance Frequency:
                </label>
                <input
                  type="number"
                  name="attendance_frequency"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* location and activity mode */}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isLocationExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isLocationExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Location and Activity Mode
          </p>

          {sections.isLocationExpanded && (
            <div className="mt-4 space-y-6">
              {/* venue */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Venue:
                </label>
                <input
                  type="text"
                  name="venue"
                  value={venue}
                  onChange={(e) => setvenue(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* mode (online/offline) */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Mode:
                </label>
                <select
                  name="mode"
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={mode}
                  onChange={(e) => setmode(e.target.value)}
                >
                  <option value="">Select Mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              {/* online link */}
              {mode.mode === "online" && (
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700">
                    Zoom/Link URL:
                  </label>
                  <input
                    type="url"
                    name="link"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={virtuallink}
                    onChange={(e) => setvirtuallink(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* attendance tracking section*/}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isAttendanceExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isAttendanceExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Attendance Tracking
          </p>

          {sections.isAttendanceExpanded && (
            <div className="mt-4 space-y-6">
              {/* attendance requirement */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Attendance Requirement:
                </label>
                <input
                  type="text"
                  name="attendace_requirement"
                  value={attendancerequirement}
                  onChange={(e) => setattendancerequirement(e.target.value)}
                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* attendace marking */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Attendace Marking:
                </label>
                <div className="p-4 space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="manually"
                      value="manually"
                      id="manually"
                      checked
                      onChange={(e) =>
                        setAttendanceMarkingManual(e.target.value)
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="manually"
                      className="text-sm font-medium text-gray-700"
                    >
                      Manually
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="qrcode"
                      value="qrcode"
                      id="qrcode"
                      onChange={(e) =>
                        setAttendanceMarkingQrcode(e.target.value)
                      }
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="qrcode"
                      className="text-sm font-medium text-gray-700"
                    >
                      QR Code
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* notification and reminders section*/}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isNotificationExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isNotificationExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Notification and Reminders
          </p>

          {sections.isNotificationExpanded && (
            <div className="mt-4 space-y-6">
              {/* activity reminders */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Activity Reminders:
                </label>
                <div className="p-4 space-y-4">
                  <div className="flex items-center space-x-3 ">
                    <input
                      type="radio"
                      name="activity_reminders"
                      onChange={(e) => setActivityReminders(e.target.value)}
                      value={false}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="disable"
                      className="text-sm font-medium text-gray-700"
                    >
                      Disable
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="activity_reminders"
                      onChange={(e) => setActivityReminders(e.target.value)}
                      value={true}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="enable"
                      className="text-sm font-medium text-gray-700"
                    >
                      Enable
                    </label>
                  </div>
                </div>
              </div>

              {/* announcements alerts */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Announcements Alerts:
                </label>
                <div className="p-4 space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="announcements_alerts"
                      onChange={(e) => setActivityAlerts(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="announcements alerts"
                      className="text-sm font-medium text-gray-700"
                    >
                      Disable
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="announcements_alerts"
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="announcements alerts"
                      className="text-sm font-medium text-gray-700"
                    >
                      Enable
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* facilitator information section*/}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isFacilitatorExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isFacilitatorExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Teacher/Facilitor Information
          </p>

          {sections.isFacilitatorExpanded && (
            <div className="mt-4 group ">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Add Facilitatot:
                </label>
                <div className="p-4 space-y-4"></div>
              </div>

              {/* add facilitator */}
              <div className="">
                {/* facilitators list */}
                {facilitatorsList.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <ul className="space-y-2">
                      {facilitatorsList.map((facilitator, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
                        >
                          <div className="text-sm font-medium text-gray-700">
                            <p>Email: {facilitator.email}</p>
                            <p>Contact: {facilitator.contact}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFacilitator(index)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-4 space-y-4">
                  {/* facilitator email */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Facilitator Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={facilitatorData.email}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  {/* facilitator contact */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="facilitator_contact"
                      className="text-sm font-medium text-gray-700"
                    >
                      Facilitator Contact
                    </label>

                    <input
                      type="text"
                      name="contact"
                      id="facilitator_contact"
                      value={facilitatorData.contact}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  {/* add Button */}
                  <button
                    type="button"
                    onClick={addFacilitator}
                    className="w-20 px-4 py-2 font-medium text-white rounded-md shadow bg-blue-950 hover:bg-blue-900 focus:outline-none"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* resources and materials */}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isResourcesExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isResourcesExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Resources and Materials
          </p>

          {sections.isResourcesExpanded && (
            <div className="mt-4 space-y-6">
              {/* required materials */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Required Materials:
                </label>
                <div>
                  <ul>
                    {materials.map((material, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        {material}
                        <button
                          type="button"
                          onClick={() => removeMaterial(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    id="required_materials"
                    name="required_materials"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={addMaterial}
                    type="button"
                    className="inline-block px-4 py-2 mt-2 text-white rounded-md bg-blue-950"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Attach Files:
                </label>

                <div>
                  {/* display selected files */}
                  {selectedFiles.length > 0 && (
                    <ul className="mt-4 mb-4 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center p-2 text-sm text-gray-700 border border-gray-200 rounded-md"
                        >
                          {getFileIcon(file.name)}
                          <span className="ml-2">{file.name}</span>
                          <button
                            type="button"
                            className="ml-4 text-red-500 hover:text-red-700"
                            onClick={() => removeFile(file.name)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="relative w-full p-4 border border-gray-300 border-dashed rounded-md hover:border-blue-500 focus-within:border-blue-500">
                    <div>
                      <input
                        type="file"
                        name="files"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        multiple
                      />
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 text-gray-400 group-hover:text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 16l5.5-5.5M14 7h5m-9 5l3.5 3.5m6-3l4-4m-9 10a9 9 0 110-18 9 9 0 010 18z"
                          />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-500">
                          Drag and drop or click to upload
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 mb-10 bg-gray-50">
          <p
            className="flex flex-row items-center text-lg font-semibold text-gray-800 cursor-pointer"
            onClick={() => toggleVisibility("isOrganizersExpanded")}
          >
            <MdNavigateNext
              className={`transition-transform duration-300 ${
                sections.isOrganizersExpanded ? "rotate-90" : "rotate--180"
              }`}
            />
            Organizers
          </p>

          {sections.isOrganizersExpanded && (
            <div className="mt-4 space-y-6">
              {/* add Organizers section */}

              {/* organizers form fields */}
              {organizers.map((organizer, index) => (
                <div key={index} className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700">
                      Organizer Name:
                    </label>
                    <input
                      type="text"
                      value={organizer.name}
                      onChange={(e) =>
                        handleOrganizerChange(index, "name", e.target.value)
                      }
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700">
                      Organizer Type:
                    </label>
                    <input
                      type="text"
                      value={organizer.type}
                      onChange={(e) =>
                        handleOrganizerChange(index, "type", e.target.value)
                      }
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Info:
                    </label>
                    <input
                      type="email"
                      value={organizer.contact}
                      onChange={(e) =>
                        handleOrganizerChange(index, "contact", e.target.value)
                      }
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio:
                    </label>
                    <textarea
                      rows="4"
                      value={organizer.bio}
                      onChange={(e) =>
                        handleOrganizerChange(index, "bio", e.target.value)
                      }
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    ></textarea>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700">
                      Website:
                    </label>
                    <input
                      type="url"
                      value={organizer.website}
                      onChange={(e) =>
                        handleOrganizerChange(index, "website", e.target.value)
                      }
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOrganizer(index)}
                    className="inline-block px-4 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-700"
                  >
                    Remove Organizer
                  </button>
                  <hr />
                </div>
              ))}

              <div className="group">
                <button
                  type="button"
                  onClick={handleAddOrganizer}
                  className="inline-block px-4 py-2 mt-2 text-white rounded-md bg-blue-950"
                >
                  Add Organizer
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center h-10 mb-10 space-x-4">
          <button
            type="submit"
            onClick={createActivity}
            className="flex items-center gap-2 px-4 py-1 text-white rounded-md bg-blue-950 hover:bg-blue-900 focus:outline-none "
          >
            <FaRegSave className="w-5 h-24" />
            Save
          </button>

          <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
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

export default CreateActivity;
