import React, { useState } from 'react'
import { MdNavigateNext } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeDocx } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { RiDraftFill } from "react-icons/ri";


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
        <FaFilePdf className="text-red-500 w-6 h-6 hover:text-red-700 transition duration-200" />
      );
    }

    if (fileExtension === "docx" || fileExtension === "doc") {
      return (
        <BsFiletypeDocx className="text-blue-500 w-6 h-6 hover:text-blue-700 transition duration-200" />
      );
    }

    if (
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png" ||
      fileExtension === "svg"
    ) {
      return (
        <FaFileImage className="text-blue-500 w-6 h-6 hover:text-blue-700 transition duration-200" />
      );
    }

    // default file icon for other types
    return (
      <FaFile className="text-gray-900 w-6 h-6 hover:text-gray-800 transition duration-200" />
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

  const [activityDetails, setActivityDetails] = useState({
    name: "",
    description: "",
    activity_type: "",
    date: "",
    time: "",
    location: "",
    link: "",
    image: "",
    mode: "",
    venue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="pt-16 pl-10 pr-10 create_activity_cont">
      <h1 className="p-4 bg-gray-50 mt-2 mb-2">Create activity</h1>
      <form className="flex flex-col gap-2">
        {/* general section */}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
              {/* activity name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Activity Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* description */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="description"
                  rows="4"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                ></textarea>
              </div>

              {/* activity type */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Activity Type:
                </label>
                <input
                  type="text"
                  name="activity_type"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* participant criteria section*/}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
                  name="eligibility"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                        className="flex justify-between items-center"
                      >
                        {specialRequirement}
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="text-red-500 ml-2"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <input
                    type="text"
                    id="special_requirement"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addRequirements}
                    className="mt-2 inline-block bg-blue-950 text-white py-2 px-4 rounded-md"
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
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
                          id="start_date"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                          id="start_time"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                          id="end_date"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                          id="end_time"
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* location and activity mode */}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={activityDetails.venue}
                  onChange={handleInputChange}
                />
              </div>

              {/* mode (online/offline) */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  Mode:
                </label>
                <select
                  name="mode"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={activityDetails.mode}
                  onChange={handleInputChange}
                >
                  <option value="">Select Mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              {/* online link */}
              {activityDetails.mode === "online" && (
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700">
                    Zoom/Link URL:
                  </label>
                  <input
                    type="url"
                    name="link"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={activityDetails.link}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* attendance tracking section*/}
        <div className="p-4 bg-gray-50">
          <p
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      id="manually"
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                      id="qrcode"
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
                      value={false}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                      value={true}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
            <div className="group mt-4 ">
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
                          className="border border-gray-200 p-2 rounded-md flex justify-between items-center"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  {/* add Button */}
                  <button
                    type="button"
                    onClick={addFacilitator}
                    className="w-20 bg-blue-950 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-900 focus:outline-none"
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
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
                        className="flex justify-between items-center"
                      >
                        {material}
                        <button
                          type="button"
                          onClick={() => removeMaterial(index)}
                          className="text-red-500 ml-2"
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
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={addMaterial}
                    type="button"
                    className="mt-2 inline-block bg-blue-950 text-white py-2 px-4 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attach Files:
                </label>

                <div>
                  {/* display selected files */}
                  {selectedFiles.length > 0 && (
                    <ul className="mt-4 space-y-2 mb-4">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-700 border border-gray-200 rounded-md p-2"
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

                  <div className="relative w-full border border-dashed border-gray-300 rounded-md p-4 hover:border-blue-500 focus-within:border-blue-500">
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
                          className="h-10 w-10 text-gray-400 group-hover:text-blue-500"
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
                        <p className="text-gray-600 group-hover:text-blue-500 text-sm mt-2">
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

        <div className="p-4 bg-gray-50 mb-10">
          <p
            className="flex flex-row items-center cursor-pointer text-lg font-semibold text-gray-800"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOrganizer(index)}
                    className="bg-red-500 hover:bg-red-700 text-white mt-2 inline-block py-2 px-4 rounded-md"
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
                  className="mt-2 inline-block bg-blue-950 text-white py-2 px-4 rounded-md"
                >
                  Add Organizer
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-4 h-10 justify-center mb-10">
          <button className="px-4 py-1 bg-blue-950 text-white rounded-md hover:bg-blue-900 focus:outline-none flex items-center gap-2 ">
            <FaRegSave className="h-24 w-5" />
            Save
          </button>

          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateActivity
