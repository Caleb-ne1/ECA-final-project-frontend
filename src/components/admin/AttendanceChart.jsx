import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/activity/attendance-rate`);
        const result = await response.json();
        
        if (result.success && result.data) {
          // Ensure unique activities and format data correctly
          const uniqueActivities = result.data.reduce((acc, curr) => {
            const existing = acc.find(item => item.activity === curr.activity_name);
            if (!existing) {
              acc.push({
                activity: curr.activity_name,
                attendance: parseFloat(curr.attendance_rate.replace("%", "")), 
              });
            }
            return acc;
          }, []);

          setAttendanceData(uniqueActivities);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const data = {
    labels: attendanceData.map((item) => item.activity), 
    datasets: [
      {
        label: "Attendance (%)",
        data: attendanceData.map((item) => item.attendance), 
        backgroundColor: "rgba(54, 162, 235, 0.6)", 
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Attendance (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Activities",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold mb-3">Attendance Trends</h2>
      {attendanceData.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p className="text-center text-gray-500">No attendance data available</p>
      )}
    </div>
  );
};

export default AttendanceChart;

