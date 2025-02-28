import React, { useState } from "react";
import { RxActivityLog } from "react-icons/rx";
import DashboardSummary from "./DashboardSummary";
import ActivitiesChart from "./ActivitiesChart";
import AttendanceChart from "./AttendanceChart";
import StudentParticipationChart from "./StudentParticipationChart";
import Timeline from "./Timeline";
import UpcomingActivities from "../common/UpcomingActivities";
import DashboardHeader from "../common/DashboardHeader";

export default function AdminDashboard() {
  //mock data
  const activityData = [5, 10, 7, 15, 20, 12, 25, 18, 22, 30, 28, 35];
  const attendanceData = [
    { activity: "Football", attendance: 85 },
    { activity: "Chess Club", attendance: 70 },
    { activity: "Music", attendance: 90 },
    { activity: "Drama", attendance: 60 },
    { activity: "Science Club", attendance: 75 },
  ];
  
  const eventData = [
    { title: "Caleb Kibet Registered", description: "Joined Chess Club", timestamp: "2025-02-27 10:30 AM" },
    { title: "Football Activity Created", description: "Coach Alex added a new football session", timestamp: "2025-02-26 3:15 PM" },
    { title: "Attendance Marked", description: "40 students attended Music Class", timestamp: "2025-02-25 9:00 AM" },
  ];

  const participationData = [
    { activity: "Football", percentage: 30 },
    { activity: "Chess Club", percentage: 15 },
    { activity: "Music", percentage: 20 },
    { activity: "Drama", percentage: 10 },
    { activity: "Science Club", percentage: 25 },
  ];

  const user = sessionStorage.getItem("user");
  const userData = JSON.parse(user);

  return (
    <div className="flex flex-col gap-5 p-4 student-dashboard-container">
      <DashboardHeader userData={userData} />

      <UpcomingActivities />

      <DashboardSummary
        totalStudents={200}
        totalActivities={10}
        popularActivity="Basketball"
        recentRegistrations={15}
        attendanceRate={85}
      />
      <Timeline events={eventData} />
      <ActivitiesChart monthlyData={activityData} />
      <AttendanceChart attendanceData={attendanceData} />
      <StudentParticipationChart participationData={participationData} />
    </div>
  );
}
