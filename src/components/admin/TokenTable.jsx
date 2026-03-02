import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBin5Line } from 'react-icons/ri'; 
import { FaRegCopy } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { ToastContainer, toast, Bounce } from 'react-toastify';
const TokenTable = () => {
  const [tokens, setTokens] = useState([]);

  // function to copy the registration link to clipboard
  const copyLinkToClipboard = (token) => {
    const registrationLink = `${import.meta.env.VITE_REGISTRATION_URL}/register?token=${token}`; 
    navigator.clipboard.writeText(registrationLink)
      .then(() => {
        toast.success('Registration link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy registration link: ', error);
        toast.error('Failed to copy registration link');
      });
  };

  // delete a token
  const deleteToken = (id, refreshTokens) => {
    Swal.fire({
      text: "Are you sure you want to delete this token? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5C7285",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_APP_API_URL}/api/tokens/delete/${id}`
          );
  
          Swal.fire("Deleted!", "Token has been deleted.", "success");

          if (refreshTokens) refreshTokens();
          
        } catch (error) {
          Swal.fire("Error!", "Failed to delete token.", "error");
        }
      }
    });
  };

  // fetch registartion tokens 
  const fetchTokens = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/tokens/all`);
      setTokens(response.data);
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  // function to check if the token has expired
  const hasExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="mx-auto p-4 overflow-auto">
      <h3 className="text-2xl font-bold mb-4">Registration Tokens</h3>
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              #
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Token
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Registration Status
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Role
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Expires At
            </th>
            <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={token.id} className="border-b">
              <td className="py-2 px-4 text-sm text-gray-700">{index + 1}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{token.token}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{token.user_status}</td>
              <td className="py-2 px-4 text-sm text-gray-700">{token.role}</td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {hasExpired(token.expires_at) ? (
                  <span className="text-red-500">Expired</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {new Date(token.expires_at).toLocaleString()}
              </td>
              <td className="py-2 px-4 text-sm">
                <div className="flex space-x-2">
                  {/* copy link button */}
                  <button
                    onClick={() => copyLinkToClipboard(token.token)}
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400 focus:outline-none"
                  >
                    <FaRegCopy />
                  </button>
                  {/* delete button */}
                  <button
                    onClick={() => deleteToken(token.id, fetchTokens)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                  >
                    <RiDeleteBin5Line className="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default TokenTable;


