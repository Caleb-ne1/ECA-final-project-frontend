import React from "react";
import { FaMapMarkerAlt, FaVideo, FaCheckCircle } from "react-icons/fa";
import { FaUserFriends, FaClipboardCheck, FaListUl } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import { FiFile } from "react-icons/fi";

const ActivityDetailPage = ({ activity }) => {

  const renderFileIcon = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return <FaFilePdf className="text-red-500 w-6 h-6" />;
      case "docx":
      case "doc":
        return <BsFiletypeDocx className="text-blue-500 w-6 h-6" />;
      default:
        return <FiFile className="text-gray-500 w-6 h-6" />;
    }
  };

  if (!activity) {
    return <p className="text-center text-gray-500">No activity selected.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <div className="max-w-4xl mx-auto bg-white overflow-hidden">
        {/* image section */}
        <div className="relative">
          <img
            src={activity.image}
            alt={activity.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold">{activity.name}</h1>
          </div>
        </div>

        {/* details section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activity.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Date:</span> {activity.date} -  {activity.date}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Time:</span> {activity.time}
          </p>

          <p className="text-gray-700 mt-4">{activity.description}</p>

          {/* Online/Offline Mode */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Mode</h3>
            {activity.isVirtual ? (
              <div className="flex items-center mt-2 text-blue-600">
                <FaVideo className="w-5 h-5 mr-2" />
                <span>
                  Virtual Event - Join via{" "}
                  <a
                    href={activity.link}
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
                <span>In-Person Event at {activity.location}</span>
              </div>
            )}
          </div>

          {/* organizers section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Organizers</h3>
            <div className="mt-2 p-3 bg-gray-100 rounded-lg shadow-sm">
              {activity.organizers.map((organizer, index) => (
                <div key={index} className="flex items-center mb-4">
                  {organizer.type === "person" && (
                    <div className="flex items-center">
                      <img
                        src={organizer.photo}
                        alt={organizer.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="text-gray-700 font-semibold">
                          {organizer.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {organizer.title}
                        </p>
                        {organizer.bio && (
                          <p className="text-sm text-gray-600 mt-2">
                            {organizer.bio}
                          </p>
                        )}
                        <div className="mt-2 space-x-4">
                          {organizer.socialLinks && (
                            <>
                              {organizer.socialLinks.linkedin && (
                                <a
                                  href={organizer.socialLinks.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600"
                                >
                                  LinkedIn
                                </a>
                              )}
                              {organizer.socialLinks.twitter && (
                                <a
                                  href={organizer.socialLinks.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400"
                                >
                                  Twitter
                                </a>
                              )}
                            </>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Contact: {organizer.contact}
                        </p>
                      </div>
                    </div>
                  )}

                  {organizer.type === "university" && (
                    <div className="flex items-center">
                      <img
                        src={organizer.photo}
                        alt={organizer.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="text-gray-700 font-semibold">
                          {organizer.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {organizer.title}
                        </p>
                        {organizer.bio && (
                          <p className="text-sm text-gray-600 mt-2">
                            {organizer.bio}
                          </p>
                        )}
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
                        <p className="text-sm text-gray-600">
                          Contact: {organizer.contact}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* required materials section */}
          {activity.materials && activity.materials.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Required Materials
              </h3>
              <ul className="mt-2 space-y-2">
                {activity.materials.map((material, index) => (
                  <li
                    key={index}
                    className="flex items-center p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                  >
                    <FaCheckCircle className="text-green-500 w-5 h-5 mr-2" />
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
                  <FaClipboardCheck className="w-5 h-5 text-blue-500 mt-1 mr-3" />
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
              {activity.maxParticipants && (
                <div className="flex items-start">
                  <FaUserFriends className="w-5 h-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Maximum Participants
                    </h4>
                    <p className="text-sm text-gray-600">
                      {activity.maxParticipants}
                    </p>
                  </div>
                </div>
              )}

              {/* age or grade restrictions */}
              {activity.ageRestrictions && (
                <div className="flex items-start">
                  <FaListUl className="w-5 h-5 text-purple-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Age or Grade Restrictions
                    </h4>
                    <p className="text-sm text-gray-600">
                      {activity.ageRestrictions}
                    </p>
                  </div>
                </div>
              )}

              {/* special requirements */}
              {activity.specialRequirements && (
                <div className="flex items-start">
                  <FaClipboardCheck className="w-5 h-5 text-red-500 mt-1 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      Special Requirements
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {activity.specialRequirements.map(
                        (requirement, index) => (
                          <li key={index}>{requirement}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* files section */}
          {activity.files && activity.files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Files</h3>
              <ul className="mt-2 space-y-2">
                {activity.files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center">
                      {renderFileIcon(file)}
                      <span className="ml-3 text-gray-700">{file.name}</span>
                    </div>
                    <a
                      href={file.url}
                      download
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="mt-6 px-6 py-2 bg-blue-950	 text-white rounded-lg shadow hover:bg-blue-900 transition duration-200">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;

