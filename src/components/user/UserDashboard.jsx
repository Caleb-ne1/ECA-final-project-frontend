import React, {useState} from 'react'
import { RxActivityLog } from "react-icons/rx";
import DashboardHeader from '../common/DashboardHeader';
import UpcomingActivities from '../common/UpcomingActivities';
import AttendanceSummary from './AttendanceSummary';
const UserDashboard = () => {
  const upcomingActivities = [];
  const user = sessionStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
    <div className="p-4 student-dashboard-container">
      <DashboardHeader userData={userData} />
      <UpcomingActivities activities={upcomingActivities} />
      <AttendanceSummary attendance={90} />
     
    </div>
  );
}

export default UserDashboard