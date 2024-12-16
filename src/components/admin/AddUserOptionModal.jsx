import React from 'react'

const AddUserOptionModal = ({isOpen, onClose, onSelectOption}) => {
  if(!isOpen){
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center add_user_option">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 option_container">
        <h2 className="text-xl font-bold mb-4">Add User</h2>
        <p className="mb-4">Choose an option to add a user:</p>
        <div className="flex justify-between gap-3 option_btns">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => onSelectOption("manual")}
          >
            Add Manually
          </button>
          <button
            className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
            onClick={() => onSelectOption("link")}
          >
            Generate Invitation Link
          </button>
        </div>
        <button
          className="mt-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddUserOptionModal