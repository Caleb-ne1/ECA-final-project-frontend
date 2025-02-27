import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart = ({ attendanceData }) => {
  const data = {
    labels: attendanceData.map((item) => item.activity), // activity Names
    datasets: [
      {
        label: "Attendance (%)",
        data: attendanceData.map((item) => item.attendance), // attendance Percentage
        backgroundColor: "rgba(54, 162, 235, 0.6)", // blue bars
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default AttendanceChart;
