import React from 'react'
import DashboardHeader from '../common/DashboardHeader';
import UpcomingActivities from '../common/UpcomingActivities';
import AttendanceSummary from '../user/AttendanceSummary';
import ActivitiesChart from './ActivitiesChart';

const CoordinatorDashboard = () => {
  const upcomingActivities = [
    { name: "Football Match", date: "March 5, 2025", time: "4:00 PM", location: "School Stadium" },
    { name: "Music Concert", date: "March 10, 2025", time: "6:30 PM", location: "Auditorium" },
    { name: "Chess Tournament", date: "March 15, 2025", time: "2:00 PM", location: "Library Hall" },
  ];
  const user = sessionStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
    <div className="p-4 student-dashboard-container">
      <DashboardHeader userData={userData} />
      <UpcomingActivities activities={upcomingActivities} />
      <ActivitiesChart />
    </div>
  )
}

export default CoordinatorDashboard