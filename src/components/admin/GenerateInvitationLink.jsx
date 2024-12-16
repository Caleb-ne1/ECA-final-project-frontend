import React, {useState} from 'react'
import { FaRegClipboard } from "react-icons/fa";
import axios from "axios";

const GenerateInvitationLink = () => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);


  const handleGenerateLink = async() => {
    if(!role) {
      setError('Role is required')
    }
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/admin/generate-invite`,
        {
          role: role,
          user_status: status,
        }
      );
      setInviteLink(response.data.link);
    } catch (error) {
      setError("Failed to generate invite link");
    }
  }

  //function to handle copy 
  const handleCopy = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="pt-16">
      <div className="max-w-lg p-6 mx-auto">
        {/* Header */}
        <h1 className="mb-4 text-2xl font-semibold text-gray-700">
          Generate Invitation Link
        </h1>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="role"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Select Role
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">select role</option>
              <option value="student">student</option>
              <option value="admin">Admin</option>
              <option value="coordinator">Coordinator</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Set Status for Registration Approval
            </label>
            <div class="space-y-4">
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="approved"
                  onChange={(e) => setStatus(e.target.value)}
                  name='status'
                  value={"active"}
                  class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label for="approved" class="text-gray-700 text-sm font-medium">
                  Approved
                </label>
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="pending"
                  onChange={(e) => setStatus(e.target.value)}
                  value={"pending"}
                  name='status'
                  class="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <label for="pending" class="text-gray-700 text-sm font-medium">
                  Pending Approval
                </label>
              </div>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            onClick={handleGenerateLink}
            type="button"
            className="w-full px-2 py-2 text-white rounded-md bg-blue-950 hover:bg-blue-900 focus:outline-none"
          >
            Generate Link
          </button>
        </form>

        {/* Invite Link Display */}
        <div className="flex items-center justify-between p-4 mt-6 bg-gray-100 rounded-md shadow-sm invite_link_display">
          <div>
          {inviteLink ? (
            <p className="font-medium text-indigo-600 flex-wrap">{inviteLink}</p>
          ) : (
            <p className="text-sm text-gray-500">No link generated yet.</p>
          )}
          </div>

          <div>
          <button
            className="flex flex-row items-center gap-1 px-3 py-1 ml-4 text-white bg-teal-500 rounded-md hover:bg-teal-400 focus:outline-none"
            onClick={handleCopy}
          >
            <FaRegClipboard />
            {isCopied ? "Copied!" : "Copy"}
          </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateInvitationLink