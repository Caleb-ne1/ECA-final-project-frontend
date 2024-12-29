import React, {useState} from 'react'
import { RxActivityLog } from "react-icons/rx";

const UserDashboard = () => {
  const [upcomingActivities, setupcomingActivities] = useState([])
  const user = sessionStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
    <div className="student-dashboard-container">
      <h1 className="pl-5 pt-10 font-bold text-blue-950">Hi, {userData.username}! 👋</h1>
      <div className="pl-5 pt-7 border-cyan-400">
        <h1 className='font-bold'>Timeline</h1>
        <div>
          <select name="option" className='activity_select_opt'  >
            <option value="">Next 7 days</option>
            <option value="">Next 30 days</option>
          </select>
        </div>
        <hr className='text-black'/>
        <div>
          {upcomingActivities > 0 ? (
            <></>
          ) : (
            <div className='flex flex-col items-center p-10'>
              <RxActivityLog />
              <p className='font-light text-xl'>No activities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard