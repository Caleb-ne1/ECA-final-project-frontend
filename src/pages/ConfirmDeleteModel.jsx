import React from "react";
import axios from "axios";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, userId }) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/user/admin/delete/${userId}`
      );
      if (response.status === 200) {
        onConfirm(); 
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.error || "Failed to delete user");
    } finally {
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 confirm_delete_container">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full confirm_container">
        <h2 className="text-lg font-semibold text-gray-800">
          Confirm Deletion
        </h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;