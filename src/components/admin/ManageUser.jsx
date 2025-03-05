import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { CSVLink } from "react-csv";
import { IoMdAdd } from "react-icons/io";
import AddUserOptionModal from "./AddUserOptionModal";
import ConfirmDeleteModal from "../../pages/ConfirmDeleteModel";
import { GrFormView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import StatusUpdateModal from "./StatusUpdateModal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageUser = () => {
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [showExportBox, setShowExportBox] = useState(false);
  const [showActionBoxIndex, setShowActionBoxIndex] = useState(null);
  const actionBoxRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setselectedOption] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [message, setMessage] = useState("");

  //delete modal
  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    fetchData();
  };

  //close delete modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  };

  //handle add user modal
  const handleAddUser = () => {
    setIsOpen(true);
  };

  //close add user modal
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  //handle add user options
  const handleSelectOption = (option) => {
    setselectedOption(option);
    setIsOpen(false);

    if (option === "manual") {
      window.location.href = "/add_user";
    } else if (option === "link") {
      window.location.href = "/generate_invitation_Link";
    }
  };

  const ToggleActionBox = (index) => {
    setShowActionBoxIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Hide action box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionBoxRef.current &&
        !actionBoxRef.current.contains(event.target)
      ) {
        setShowActionBoxIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //filter user for csv download
  const filteredData = users.map(({ password, otp, id, ...rest }) => rest);

  // get time and date
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  const time = today.toTimeString().split(" ")[0];

  //fetch user data
  const fetchData = async (page, limit) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/user/all?page=${page}&limit=${limit}`
      );

      const { results, next } = response.data;
      setHasNextPage(!!next);
      setUsers(results);
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  //handle user view details
  const handleViewUser = (id) => {
    window.location.href = `/view?id=${encodeURIComponent(id)}`;
  };

  //handle edit user
  const handleEditUser = (id) => {
    window.location.href = `/edit?id=${encodeURIComponent(id)}`;
  };

  // handle user registration status
  const handleStatusChange = async (e, id) => {
    const newStatus = e.target.value;

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_URL}/api/user/update-status/${id}`,
        { user_status: newStatus }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setShowUpdateModal(true);
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, user_status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  return (
    <div className="flex flex-col mt-20 manage_users">
      <div>
        {/* search bar */}
        <div className="flex justify-center p-4 search_bar">
          <form className="flex items-center px-4 py-2 transition duration-200 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:border-purple-600">
            <IoMdSearch className="text-2xl text-gray-500" />
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="w-full ml-2 text-gray-700 placeholder-gray-400 bg-transparent outline-none focus:ring-0"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="px-5 actions_bar">
          <div className="mb-6">
            <h2 className="pt-2 text-2xl font-bold text-gray-800">Users</h2>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* pagination limit input*/}
            <div className="flex items-center gap-2">
              <p className="text-gray-700">Showing</p>
              <input
                type="number"
                className="w-20 p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setLimit(e.target.value)}
                value={limit}
              />
            </div>

            {/* Export Options */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={() =>
                  setShowExportBox(!showExportBox) & setShowFilterBox(false)
                }
              >
                <BiExport />
                <p>Export</p>
              </button>

              {/* Export Floating Box */}
              {showExportBox && (
                <div className="absolute right-0 z-10 w-40 p-2 bg-white border border-gray-300 rounded-lg shadow-md top-12">
                  {/* react-csv link to download user data in csv format */}
                  <CSVLink
                    data={filteredData}
                    filename={`users-${date}-${time}`}
                  >
                    Export as CSV
                  </CSVLink>
                </div>
              )}
            </div>

            <button
              className="flex items-center gap-2 px-4 py-2 text-white rounded-md bg-blue-950 hover:bg-blue-900"
              onClick={handleAddUser}
            >
              <IoMdAdd />
              <p>Add user</p>
            </button>
          </div>
        </div>

        {/* users table */}
        <div className="p-6 mt-2 mb-5 overflow-x-auto bg-gray-100">
          <table className="w-full bg-white border border-collapse border-gray-300 rounded-md table-auto">
            <thead>
              <tr className="text-gray-700 bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">Username</th>
                <th className="px-4 py-2 border border-gray-300">Full Name</th>
                <th className="px-4 py-2 border border-gray-300">Phone</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">
                  Registration Status
                </th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users
                  .filter((user) => {
                    if (searchTerm === "") {
                      return true;
                    }

                    const firstNameMatch =
                      user.FirstName &&
                      user.FirstName.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      );
                    const lastNameMatch =
                      user.LastName &&
                      user.LastName.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      );
                    const roleMatch =
                      user.role &&
                      user.role
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    const usernameMatch =
                      user.username &&
                      user.username
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    const emailMatch =
                      user.email &&
                      user.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());

                    return (
                      firstNameMatch ||
                      lastNameMatch ||
                      roleMatch ||
                      usernameMatch ||
                      emailMatch
                    );
                  })
                  .map((user, index) => (
                    <tr key={index} className="text-gray-700 hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300">
                        {user.username}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {user.FirstName} {user.LastName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {user.phone}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <select
                          name="user_status"
                          value={user.user_status}
                          onChange={(e) => handleStatusChange(e, user.id)}
                          className={
                            "px-3 py-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          }
                        >
                          <option
                            value="active"
                            className={
                              user.user_status === "active"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                          >
                            Approved
                          </option>
                          <option
                            value="pending"
                            className={
                              user.user_status === "pending"
                                ? "bg-red-100 text-red-800"
                                : ""
                            }
                          >
                            Pending Approval
                          </option>
                        </select>
                      </td>

                      <td className="px-4 py-2 border border-gray-300">
                        {user.role}
                      </td>
                      <td className="relative px-4 py-2 border border-gray-300">
                        <button
                          type="button"
                          onClick={() => ToggleActionBox(index)}
                          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200"
                        >
                          <BsThreeDots className="text-lg text-gray-700" />
                        </button>

                        {/* Floating Action Box */}
                        {showActionBoxIndex === index && (
                          <div
                            ref={actionBoxRef}
                            className="absolute right-0 z-10 flex flex-col w-32 gap-2 p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-md top-9"
                          >
                            <button
                              className="flex flex-row items-center gap-2 p-1 text-white bg-blue-600 rounded hover:bg-blue-500"
                              onClick={() => handleViewUser(user.id)}
                            >
                              <GrFormView />
                              View
                            </button>
                            <button
                              className="flex flex-row items-center gap-2 p-1 bg-yellow-500 rounded hover:bg-yellow-400"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button
                              className="flex flex-row items-center gap-2 p-1 text-white bg-red-600 rounded hover:bg-red-500"
                              onClick={() => handleDeleteClick(user.id)}
                            >
                              <MdDeleteOutline />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-2 text-black rounded bg-gray-50 hover:bg-gray-400 disabled:opacity-50"
          >
            <GrFormPrevious />
          </button>
          <p className="px-2 text-white bg-blue-950">{page}</p>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-2 py-2 text-black rounded bg-gray-50 hover:bg-gray-400 disabled:opacity-50"
          >
            <GrFormNext />
          </button>
        </div>
      </div>

      {/* Add user modal */}
      <AddUserOptionModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSelectOption={handleSelectOption}
      />

      {/* delete user modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        userId={selectedUserId}
      />

      {/* status update modal */}
      {showUpdateModal && (
        <StatusUpdateModal
          message={message}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default ManageUser;
