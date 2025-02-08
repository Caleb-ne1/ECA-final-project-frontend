import React, {useState} from 'react'
import { RxActivityLog } from "react-icons/rx";

const UserDashboard = () => {
  const [upcomingActivities, setupcomingActivities] = useState([])
  const user = sessionStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
    <div className="student-dashboard-container p-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Hi, {userData.username}! 👋
      </h1>

      {/* Timeline Section */}
      <div className="bg-white p-5">
        <h1 className="font-bold text-lg text-gray-800 mb-4">Timeline</h1>
        <div className="mb-4">
          <select
            name="option"
            className="activity_select_opt w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="">Next 7 days</option>
            <option value="">Next 30 days</option>
          </select>
        </div>

        <hr className="border-gray-300 my-4" />

        <div>
          {upcomingActivities.length > 0 ? (
            <div className="text-gray-800">
              {" "}
              {/* Replace with activity rendering */}
              {upcomingActivities.map((activity, index) => (
                <p key={index}>{activity}</p>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center p-10 text-gray-500">
              <RxActivityLog className="text-4xl mb-4" />
              <p className="font-light text-xl">No activities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard