import React, { useState, useEffect } from 'react'
import { CiEdit } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const [isEditting, setisEditting] = useState(false);
  const [isEdittingAcInfo, setisEdittingAcInfo] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isvisible, setisVisible] = useState(false)
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    username: "",
    role: "",
    institution_id: "",
    program_of_study: "",
    year_of_study: ""
  });

  // function to fetch user details
  const fetchUser = async () => {
    try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/user/me`, {
      withCredentials: true,
    });
    const data = response.data 
    setUser({
      FirstName: data.user.FirstName,
      LastName: data.user.LastName,
      email: data.user.email,
      phone: data.user.phone,
      username: data.user.username,
      role: data.user.role,
      institution_id: data.user.institution_id,
      program_of_study: data.user.program_of_study,
      year_of_study: data.user.program_of_study
    });
    } catch(error) {
      if (!error.response) {
        console.error(
          "Unable to connect to the server. Please try again later."
        );
      } else {
        console.error("An error occurred while fetching data.");
      }
    }
  }

  console.log(user)
  useEffect(() => {
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const EditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_APP_API_URL}/api/user/me/update`, user, {
        withCredentials: true,
      });
      setisEditting(false);
      setisEdittingAcInfo(false)
    } catch(error) {
      console.error("Error updating the user ", error);
    }
  }

  //change password
  const ChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (password1 === "" || password2 === "") {
        setError("Password fields must not be empty");
        setSuccess("");
      } else if (password1 === password2) {
        setNewPassword(password2);

        const response = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/user/change-password`,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setError("");
          setSuccess("Password changed successfully!");
        } else {
          setError(response.data.message);
          setSuccess("");
        }
      } else {
        setError("Passwords do not match");
        setSuccess("");
      }
    } catch (error) {
      console.error("An error occurred", error);
      setError("An unexpected error occurred");
      setSuccess("");
    }
  };
  return (
    <div className="user_profile_container">
      <div className="user_profile">
        <div className="profile_image">
          <FaUser className="user_image" />
        </div>
        <div>
          <h2>{user.username}</h2>
          <p>{user.role}</p>
        </div>
      </div>

      {/* personal information */}
      <form onSubmit={EditFormSubmit}>
        <div className="personal_information_container">
          <div className="personal_info_pr">
            <h2>Personal Information</h2>
            {!isEditting ? (
              <div
                className="edit_profile_info"
                onClick={() => setisEditting(true)}
              >
                <p>Edit</p>
                <CiEdit />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="personal_info">
            <div className="col_group">
              <h3>First Name</h3>
              {!isEditting ? (
                <p>{user.FirstName}</p>
              ) : (
                <>
                  <input
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    className="edit_user_input"
                    value={user.FirstName}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
            <div>
              <h3>Last Name</h3>
              {!isEditting ? (
                <p>{user.LastName}</p>
              ) : (
                <>
                  <input
                    type="text"
                    name="LastName"
                    id="LastName"
                    className="edit_user_input"
                    value={user.LastName}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </div>
          <div className="personal_info">
            <div>
              <h3>Email Address</h3>
              {!isEditting ? (
                <p>{user.email}</p>
              ) : (
                <>
                  <input
                    type="text"
                    className="edit_user_input"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
            <div>
              <h3>Phone</h3>
              {!isEditting ? (
                <p>{user.phone}</p>
              ) : (
                <>
                  <input
                    type="text"
                    className="edit_user_input"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </div>

          {isEditting ? (
            <div className="edit_form_btns">
              <button type="submit" className="edit_btn">
                Update
              </button>
              <button
                onClick={() => setisEditting(false)}
                className="edit_cancel_btn"
              >
                Cancel
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="personal_information_container">
          <div className="personal_info_pr">
            <h2>Academic Information</h2>
            {!isEdittingAcInfo ? (
              <div
                className="edit_profile_info"
                onClick={() => setisEdittingAcInfo(true)}
              >
                <p>Edit</p>
                <CiEdit />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="personal_info">
            <div className="col_group">
              <h3>Instituion ID</h3>
              {!isEdittingAcInfo ? (
                <p>{user.institution_id}</p>
              ) : (
                <>
                  <input
                    type="text"
                    name="institution_id"
                    id="institution_id"
                    className="edit_user_input"
                    value={user.institution_id}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
            <div>
              <h3>Program of Study</h3>
              {!isEdittingAcInfo ? (
                <p>{user.program_of_study}</p>
              ) : (
                <>
                  <input
                    type="text"
                    name="program_of_study"
                    id="program_of_study"
                    className="edit_user_input"
                    value={user.program_of_study}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </div>
          <div className="personal_info">
            <div>
              <h3>Year of study</h3>
              {!isEdittingAcInfo ? (
                <p>{user.year_of_study}</p>
              ) : (
                <>
                  <input
                    type="text"
                    className="edit_user_input"
                    name="year_of_study"
                    value={user.year_of_study}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </div>

          {isEdittingAcInfo ? (
            <div className="edit_form_btns">
              <button type="submit" className="edit_btn">
                Update
              </button>
              <button
                onClick={() => setisEdittingAcInfo(false)}
                className="edit_cancel_btn"
              >
                Cancel
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
      {/* security */}
      <div className="security_info">
        <h2>Security</h2>
        <div className="change_pswd">
          <h3>Change password</h3>
          <div className="change_password" onClick={() => setisVisible(true)}>
            <p>Change password</p>
            <CiEdit />
          </div>
        </div>
        {isvisible ? (
          <form
            className="change_password_form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="password"
              name="oldPassword"
              placeholder="current password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              name="password1"
              placeholder="new password"
              onChange={(e) => setPassword1(e.target.value)}
            />
            <input
              type="password"
              name="password2"
              placeholder="confirm password"
              onChange={(e) => setPassword2(e.target.value)}
            />
            {error && <p className="error_message">{error}</p>}
            <div className="btn_group">
              <button type="button" onClick={ChangePassword}>
                Submit
              </button>
              <button
                className="cancel_btn"
                onClick={() => setisVisible(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <></>
        )}
        {success && <p className="success_message">{success}</p>}
      </div>
    </div>
  );
}

export default Profile